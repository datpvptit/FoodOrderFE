import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const key_val = {
  email: "Email tài khoản",
  password: "Mật khẩu",
  roles: "Quyền tài khoản",
  fullname: "Họ tên"
}
const ModalAddAccount = ({ isOpen, toggle, handleSaveUser }) => {
  const [isValid, setIsValid] = useState(true); // Thêm state để lưu trạng thái của việc validate
  const [user, setUser] = useState({
    email: "",
    password: "",
    fullname: "",
    roles: [],
  });
  const validateFormData = (data) => {
    // Thực hiện validate dữ liệu
    for (var key in data) {
      if ((data[key] === "") && key != "fullname") {
        alert(key + '/' + key_val[key] + ' không được để trống !');
        return false;
      }
    }
    return true;
  };
  const handleOnChangeInput = (event, field) => {
    if (field === 'roles') {
      setUser({
        ...user,
        [field]: [event.target.value],
      })
    } else
      setUser({
        ...user,
        [field]: event.target.value,
      });
  };
  const handleSaveButtonClick = () => {
    console.log("click")
    // Thực hiện validate dữ liệu
    const isValidData = validateFormData(user);

    // Nếu dữ liệu không hợp lệ, không thực hiện lưu và hiển thị thông báo lỗi
    if (!isValidData) {
      setIsValid(false);
      return;
    }

    // Nếu dữ liệu hợp lệ, thực hiện hành động lưu dữ liệu
    handleSaveUser(user);
    toggle();
    setIsValid(true); // Reset trạng thái của việc validate khi đóng Modal
    setUser({
      email: "",
      password: "",
      fullname: "",
      roles: []
    });

  }

  const handleSubmit = (event) => {
    // Handle form submission
    event.preventDefault();
    // Your logic here to handle form submission
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Thêm mới tài khoản</ModalHeader>
      <ModalBody>
        <Form id="addProductForm" onSubmit={handleSubmit}>

          <FormGroup>
            <Label for="email">Tên tài khoản <span style={{ color: "red" }}>*</span> </Label>
            <Input type="text" id="email" name="email"
              value={user.email}
              onChange={(event) => handleOnChangeInput(event, "email")}
              required />
          </FormGroup>

          <FormGroup>
            <Label for="password">Mật khẩu <span style={{ color: "red" }}>*</span></Label>
            <Input type="password" id="password" name="password"
              value={user.password}
              onChange={(event) => handleOnChangeInput(event, "password")}
              required />
          </FormGroup>

          <FormGroup>
            <Label for="roles">Quyền hạn <span style={{ color: "red" }}>*</span></Label>
            <Input type="select" id="roles" name="roles"
              onChange={(event) => handleOnChangeInput(event, "roles")}
              value={user.roles}
              required>
              <option value="" disabled>
                - Chọn -
              </option>
              <option value="RECEP">Nhân viên lễ tân</option>
              <option value="STAFF">Nhân viên phục vụ</option>
              <option value="CHEF">Nhân viên nhà bếp</option>
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="fullname">Họ và tên </Label>
            <Input type="text" id="fullname" name="fullname"
              value={user.fullname}
              onChange={(event) => handleOnChangeInput(event, "fullname")} />
          </FormGroup>

          {/* <FormGroup>
            <Label for="role">Danh Mục</Label>
            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
              <DropdownToggle caret>
                Chọn quyền
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>Admin</DropdownItem>
                <DropdownItem>User</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </FormGroup> */}

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
