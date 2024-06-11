import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const key_val = {
  title: "Tên món ăn",
  detail: "Chi tiết mô tả",
  material: "Nguyên liệu",
  timeServe: "Thời gian phục vụ",
  image: "Ảnh mô tả"
}
const ImageInput = ({ onChange }) => {
  const [imageSrc, setImageSrc] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);
      onChange(file); // Truyền tệp hình ảnh đã chọn ra bên ngoài
    }
  };

  return (
    <FormGroup>
      <Label for="imageInput">Ảnh mô tả <span style={{ color: "red" }}>*</span></Label>
      <Input
        type="file"
        name="imageInput"
        id="imageInput"
        onChange={handleImageChange}
        accept="image/*"
      />
      {imageSrc && (
        <img
          src={imageSrc}
          alt="Preview"
          className="preview-image"
          style={{ marginTop: "10px", maxWidth: "100px", maxHeight: "100px" }}
        />
      )}
    </FormGroup>
  );
};

const ModalAddProduct = ({ isOpen, toggle, listCategory, handleSaveFood }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isValid, setIsValid] = useState(true); // Thêm state để lưu trạng thái của việc validate
  const [food, setFood] = useState({
    title: "",
    detail: "",
    material: "",
    timeServe: "",
    price: 0,
    image: "",
    category: "",
  });

  // Cập nhật selectedCategory khi listCategory thay đổi
  useEffect(() => {
    if (listCategory.length > 0) {
      setSelectedCategory(listCategory[0].name);
      setFood((prevFood) => ({
        ...prevFood,
        category: listCategory[0].name,
      }));
    }
  }, [listCategory]);

  const handleOnChangeInput = (event, key) => {
    const { value } = event.target;

    if (key === "category") {
      setSelectedCategory(value);
    }

    setFood((prevFood) => ({
      ...prevFood,
      [key]: value,
    }));
  };

  const handleImageChange = (file) => {
    setFood((prevFood) => ({
      ...prevFood,
      image: file,
    }));
  };

  const handleSaveButtonClick = () => {
    console.log("click")
    // Thực hiện validate dữ liệu
    const isValidData = validateFormData(food);

    // Nếu dữ liệu không hợp lệ, không thực hiện lưu và hiển thị thông báo lỗi
    if (!isValidData) {
      setIsValid(false);
      return;
    }

    // Nếu dữ liệu hợp lệ, thực hiện hành động lưu dữ liệu
    handleSaveFood(food);
    toggle();
    setIsValid(true); // Reset trạng thái của việc validate khi đóng Modal
    setFood({
      title: "",
      detail: "",
      material: "",
      timeServe: "",
      price: 0,
      image: "",
      category: listCategory.length > 0 ? listCategory[0].name : "",
    });
  };

  const validateFormData = (data) => {
    // Thực hiện validate dữ liệu
    for (var key in data) {
      if ((data[key] === "") && key != "detail") {
        alert(key_val[key] + ' không được để trống !');
        return false;
      }
    }
    return true;
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Thêm mới món ăn</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="productName">Tên món ăn <span style={{ color: "red" }}>*</span></Label>
          <Input
            type="text"
            name="productName"
            id="productName"
            value={food.title}
            onChange={(event) => handleOnChangeInput(event, "title")}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="productDetail">Chi tiết mô tả</Label>
          <Input
            type="text"
            name="productDetail"
            id="productDetail"
            value={food.detail}
            onChange={(event) => handleOnChangeInput(event, "detail")}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="productMaterial">Chi tiết nguyên liệu <span style={{ color: "red" }}>*</span></Label>
          <Input
            type="text"
            name="productMaterial"
            id="productMaterial"
            value={food.material}
            onChange={(event) => handleOnChangeInput(event, "material")}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="productTimeServe">Thời gian phục vụ <span style={{ color: "red" }}>*</span></Label>
          <Input
            type="number"
            name="productTimeServe"
            id="productTimeServe"
            value={food.timeServe}
            onChange={(event) => handleOnChangeInput(event, "timeServe")}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="productPrice">Giá bán  <span style={{ color: "red" }}>*</span></Label>
          <Input
            type="number"
            name="productPrice"
            id="productPrice"
            value={food.price}
            onChange={(event) => handleOnChangeInput(event, "price")}
            required
          />
        </FormGroup>
        <ImageInput onChange={handleImageChange} />
        <FormGroup>
          <Label for="category">Thể loại món</Label>
          <Input
            type="select"
            name="category"
            id="category"
            value={selectedCategory}
            onChange={(event) => handleOnChangeInput(event, "category")}
            required
          >
            {listCategory.map((item, index) => (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            ))}
          </Input>
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={handleSaveButtonClick}>
          Save
        </Button>
        <Button color="secondary" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>

  )
    ;
};

export default ModalAddProduct;
