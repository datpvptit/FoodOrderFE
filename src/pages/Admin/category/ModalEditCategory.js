import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const ModalEditCategory = ({ isOpen, toggle, category, handleUpdate }) => {
    const [newCategory, setNewCategory] = useState(category.name);

    const handleOnChangeInput = (event) => {
        let categoryName = event.target.value;
        setNewCategory(categoryName);
    }

    // khi ấn vào nút Ok sẽ gọi lại hàm handleDelete của cha để xóa 
    const handleUpdateButtonClick = () => {
        handleUpdate({ id: category.id, name: category.name, newName: newCategory });
        toggle();
    }
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Sửa danh mục</ModalHeader>
            <ModalBody>
                <form id="editForm">
                    <div className="form-group">
                        <label htmlFor="tenDanhMucEdit">Tên Danh Mục</label>
                        <input type="hidden" id="categoryId" />
                        <input
                            type="text"
                            className="form-control"
                            id="tenDanhMucEdit"
                            value={newCategory} // Thay đổi giá trị thành newCategory
                            onChange={(event) => handleOnChangeInput(event)}
                            required
                        />
                    </div>
                </form>
            </ModalBody>
            <ModalFooter>
                <Button className='btn btn-primary' onClick={handleUpdateButtonClick}>Update</Button>
                <Button color="secondary" onClick={toggle}>Close</Button>
            </ModalFooter>
        </Modal>
    );
}

export default ModalEditCategory;
