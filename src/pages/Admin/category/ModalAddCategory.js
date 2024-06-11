import React, {useState} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const ModalAddCategory = ({ isOpen, toggle, handleSave }) => {
    const [categoryName, setCategoryName] = useState("");

    const handleOnChangeInput = (event) => {
        setCategoryName(event.target.value);
    }

    const handleSaveButtonClick = () => {
        handleSave(categoryName);
        toggle();
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Thêm mới danh mục</ModalHeader>
            <ModalBody>
                <form id="createForm">
                    <div className="form-group">
                        <label htmlFor="tenDanhMuc">Tên Danh Mục</label>
                        <input type="text" className="form-control" onChange={(event) => handleOnChangeInput(event)} id="tenDanhMuc" required />
                    </div>
                </form>
            </ModalBody>
            <ModalFooter>
                <Button className='btn btn-primary' onClick={handleSaveButtonClick}>Save</Button>
                <Button color="secondary" onClick={toggle}>Close</Button>
            </ModalFooter>
        </Modal>
    );
}

export default ModalAddCategory;
