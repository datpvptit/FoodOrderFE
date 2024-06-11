import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const key_val = {
  phoneNumber: "Số điện thoại",
  fullName: "Họ và tên",
  address: "Địa chỉ"
}
const ModalAddAccount = ({ isOpen, toggle, handleAddCustomer }) => {
  const [isValid, setIsValid] = useState(true); // Thêm state để lưu trạng thái của việc validate
  const [customer, setCustomer] = useState({
    phoneNumber: "",
    fullName: "",
    address: ""
  });
  const validateFormData = (data) => {
    // Thực hiện validate dữ liệu
    for (var key in data) {
      if ((data[key] === "") && key != "address") {
        alert(key + '/' + key_val[key] + ' không được để trống !');
        return false;
      }
    }
    return true;
  };
  const handleOnChangeInput = (event, field) => {
    if (field === 'roles') {
      setCustomer({
        ...customer,
        [field]: [event.target.value],
      })
    } else
      setCustomer({
        ...customer,
        [field]: event.target.value,
      });
  };
  const handleSaveButtonClick = () => {
    console.log("click")
    // Thực hiện validate dữ liệu
    const isValidData = validateFormData(customer);

    // Nếu dữ liệu không hợp lệ, không thực hiện lưu và hiển thị thông báo lỗi
    if (!isValidData) {
      setIsValid(false);
      return;
    }

    // Nếu dữ liệu hợp lệ, thực hiện hành động lưu dữ liệu
    handleAddCustomer(customer);
    toggle();
    setIsValid(true); // Reset trạng thái của việc validate khi đóng Modal
    setCustomer({
      phoneNumber: "",
      fullName: "",
      address: ""
    });

  }

  const handleSubmit = (event) => {
    // Handle form submission
    event.preventDefault();
    // Your logic here to handle form submission
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Thêm mới thông tin khách hàng</ModalHeader>
      <ModalBody>
        <Form id="addCustomerForm" onSubmit={handleSubmit}>

          <FormGroup>
            <Label for="phoneNumber">Số điện thoại <span style={{ color: "red" }}>*</span> </Label>
            <Input type="text" id="phoneNumber" name="phoneNumber"
              value={customer.phoneNumber}
              onChange={(event) => handleOnChangeInput(event, "phoneNumber")} />
          </FormGroup>

          <FormGroup>
            <Label for="fullName">Tên khách hàng<span style={{ color: "red" }}>*</span></Label>
            <Input type="text" id="fullName" name="fullName"
              value={customer.fullName}
              onChange={(event) => handleOnChangeInput(event, "fullName")} />
          </FormGroup>

          <FormGroup>
            <Label for="address">Địa chỉ </Label>
            <Input type="text" id="address" name="address"
              value={customer.address}
              onChange={(event) => handleOnChangeInput(event, "address")} />
          </FormGroup>

          <ModalFooter>
            <Button type="submit" color="success" onClick={handleSaveButtonClick}>Save</Button>{' '}
            <Button color="secondary" onClick={toggle}>Close</Button>
          </ModalFooter>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default ModalAddAccount;
