import React from "react";

import Input from "../../../components/UI/Input";
import Modal from "../../../components/UI/Modal";
import { Row, Col } from "react-bootstrap";

const AddCateogryModal = (props) => {
    const {
        show,
        handleClose,
        onSubmit,
        categoryList,
        modelTitle,
        setCategoryName,
        setParentCategoryId,
        parentCategoryId,
        categoryName,
        handleCategoryImage,
    } = props;
    return (
        <Modal show={show} handleClose={handleClose} onSubmit={onSubmit} modelTitle={modelTitle}>
            <Row>
                <Col>
                    <Input
                        placeholder={"Cateogory Name"}
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className="form-control-sm"
                    />
                </Col>
                <Col>
                    <select
                        className="form-control form-control-sm"
                        value={parentCategoryId}
                        onChange={(e) => setParentCategoryId(e.target.value)}
                    >
                        <option>Select category</option>
                        {categoryList.map((option) => (
                            <option key={option.name} value={option.value}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </Col>
            </Row>
            <Row>
                <Col>
                    <input type="file" name="categoryImage" onChange={handleCategoryImage} />
                </Col>
            </Row>
        </Modal>
    );
};

export default AddCateogryModal;
