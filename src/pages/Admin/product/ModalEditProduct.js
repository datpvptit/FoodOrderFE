import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input } from 'reactstrap';

// Component ImageInput để xử lý chọn hình ảnh
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
            <Label for="imageInput">Ảnh Sản Phẩm</Label>
            <Input type="file" name="imageInput" id="imageInput" onChange={handleImageChange} accept="image/*" />
            {imageSrc && (
                <img src={imageSrc} alt="Preview" className="preview-image" style={{ marginTop: "10px", maxWidth: "100px", maxHeight: "100px" }} />
            )}
        </FormGroup>
    );
};

const ModalEditProduct = ({ isOpen, toggle, food, listCategory, handleUpdateFood }) => {    
    const [newFood, setNewFood] = useState(food);
    const [imageSrc, setImageSrc] = useState("");
    const staticUrl = process.env.REACT_APP_API_URL_IMAGE;
    useEffect(() => {
        // Kiểm tra nếu food có ảnh
        if (food.image) {
            setImageSrc(`${staticUrl}/${food.image}`);
        }
    }, [food]);

    const handleInputChange = (event, key) => {
        const { value } = event.target;
        setNewFood(prevFood => ({
            ...prevFood,
            [key]: value,
        }));
    };

    const handleImageChange = (file) => {
        // Cập nhật tên tệp hình ảnh vào newFood
        setImageSrc("")
        setNewFood(prevFood => ({
            ...prevFood,
            image: file,
        }));
    };

    const handleUpdateButtonClick = () => {
        // Xử lý cập nhật thông tin sản phẩm
        handleUpdateFood(newFood);
        // Có thể gọi hàm toggle để đóng modal sau khi cập nhật
        toggle();
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Sửa sản phẩm</ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Label for="productNameEdit">Tên sản phẩm</Label>
                    <Input type="text" name="productNameEdit" id="productNameEdit" value={newFood.title} onChange={(event) => handleInputChange(event, "title")}  required />
                </FormGroup>
                <FormGroup>
                    <Label for="productDetailEdit">Chi tiết sản hẩm</Label>
                    <Input type="text" name="productDetailEdit" id="productDetailEdit" value={newFood.detail} onChange={(event) => handleInputChange(event, "detail")}  required />
                </FormGroup>
                <FormGroup>
                    <Label for="productMaterialEdit">Chi tiết nguyên liệu</Label>
                    <Input type="text" name="productMaterialEdit" id="productMaterialEdit" value={newFood.detail} onChange={(event) => handleInputChange(event, "material")}  required />
                </FormGroup>
                <FormGroup>
                    <Label for="productTimeServe">Thời gian phục vụ</Label>
                    <Input type="number" name="productTimeServe" id="productTimeServe" onChange={(event) => handleInputChange(event, "timeServe")} value={newFood.timeServe} required />
                </FormGroup>
                <FormGroup>
                    <Label for="productPriceEdit">Giá Bán</Label>
                    <Input type="number" name="productPriceEdit" id="productPriceEdit" onChange={(event) => handleInputChange(event, "price")} value={newFood.price} required />
                </FormGroup>
                {/* Hiển thị ảnh cũ */}
                <ImageInput onChange={handleImageChange} /> {/* Sử dụng component ImageInput */}
                {imageSrc && (
                    <img src={imageSrc} alt="Old Image" style={{ marginTop: "10px", maxWidth: "100px", maxHeight: "100px" }} />
                )}
                <FormGroup>
                    <Label for="category">Danh Mục</Label>
                    <Input
                        type="select"
                        name="category"
                        id="category"
                        value={newFood.category_name}
                        onChange={(event) => handleInputChange(event, "category_name")}
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
                <Button color="success" onClick={handleUpdateButtonClick}>Update</Button>
                <Button color="secondary" onClick={toggle}>Close</Button>
            </ModalFooter>
        </Modal>
    );
};

export default ModalEditProduct;
