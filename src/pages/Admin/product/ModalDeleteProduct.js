import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const ModalDeleteProduct = ({ isOpen, toggle, foodId, handleDeleteFood }) => {
    const handleConfirmDelete = () => {
        // Xử lý xóa sản phẩm
        handleDeleteFood(foodId);
        // Có thể gọi hàm toggle để đóng modal sau khi xác nhận xóa
        toggle();
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Xác nhận xóa</ModalHeader>
            <ModalBody>
                Bạn có chắc chắn muốn xóa?
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={handleConfirmDelete}>OK</Button>
                <Button color="secondary" onClick={toggle}>Close</Button>
            </ModalFooter>
        </Modal>
    );
};

export default ModalDeleteProduct;
