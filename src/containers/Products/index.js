import React, { useState } from "react";
import Layout from "../../components/Layouts";
import { Container, Row, Col, Table } from "react-bootstrap";
import Input from "../../components/UI/Input";
import Modal from "../../components/UI/Modal";

import { useDispatch, useSelector } from "react-redux";
import { addProduct, deleteProductById } from "../../actions";
import "./style.css";
import { generatePublicUrl } from "../../urlConfig";

const Products = (props) => {
    const category = useSelector((state) => state.category);

    const product = useSelector((state) => state.product);

    const [show, setShow] = useState("");
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [productDetailModal, setProductDetailsModal] = useState(false);

    const [productDetails, setProductDetails] = useState(null);
    const [categoryId, setCategoryId] = useState("");
    const [productPicture, setProductPicture] = useState([]);

    const dispatch = useDispatch();

    const handleClose = () => {
        const form = new FormData();
        form.append("name", name);
        form.append("quantity", quantity);
        form.append("price", price);
        form.append("description", description);
        form.append("category", categoryId);

        for (let pic of productPicture) {
            form.append("productPicture", pic);
        }
        dispatch(addProduct(form));
        setShow(false);
    };
    const handleShow = () => setShow(true);

    const handleProductPicture = (e) => {
        setProductPicture([...productPicture, e.target.files[0]]);
    };
    const showProductDetailsModal = (product) => {
        setProductDetails(product);
        setProductDetailsModal(true);
    };

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name });
            if (category.children.length > 0) {
                createCategoryList(category.children, options);
            }
        }
        return options;
    };

    const renderProducts = () => {
        return (
            <Table style={{ fontSize: 12 }} responsive="sm">
                <thead>
                    <tr>
                        <th>SL No</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        {/* <th>Description</th> */}
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {product.products.length > 0
                        ? product.products.map((product, index) => (
                              <tr onClick={() => showProductDetailModal(product)} key={product._id}>
                                  <td>{index}</td>
                                  <td>{product.name}</td>
                                  <td>{product.price}</td>
                                  <td>{product.quantity}</td>
                                  {/* <td>{product.description}</td> */}

                                  <td>{product.category.name}</td>
                                  <td>
                                      <button onClick={() => showProductDetailsModal(product)}>info</button>
                                      <button
                                          onClick={() => {
                                              const payload = {
                                                  productId: product._id,
                                              };
                                              dispatch(deleteProductById(payload));
                                          }}
                                      >
                                          del
                                      </button>
                                  </td>
                              </tr>
                          ))
                        : null}
                </tbody>
            </Table>
        );
    };

    const renderAddProductModal = () => {
        return (
            <Modal show={show} handleClose={() => setShow(false)} onSubmit={handleClose} modelTitle={"Add New Product"}>
                <Input
                    label="Name"
                    placeholder={"Product Name"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    label="Quantity"
                    placeholder={"Quantity "}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <Input
                    label="Description"
                    placeholder={"Description "}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Input label="price" placeholder={"Price"} value={price} onChange={(e) => setPrice(e.target.value)} />
                <select className="form-control" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                    <option>Select category</option>
                    {createCategoryList(category.categories).map((option) => (
                        <option key={option.name} value={option.value}>
                            {option.name}
                        </option>
                    ))}
                </select>
                {productPicture.length > 0
                    ? productPicture.map((pic, index) => <div key={index}>{pic.name}</div>)
                    : null}
                <input type="file" name="productPicture" onChange={handleProductPicture} />
            </Modal>
        );
    };

    const handleCLoseProductDetailsModal = () => {
        setProductDetailsModal(false);
    };

    const renderProductDetailsModal = () => {
        if (!productDetails) {
            return null;
        }
        return (
            <Modal
                show={productDetailModal}
                handleClose={handleCLoseProductDetailsModal}
                modalTitle={"product Details"}
                size="lg"
            >
                <Row>
                    <Col md={6}>
                        <label className="key">Name</label>
                        <p className="value">{productDetails.name}</p>
                    </Col>
                    <Col md={6}>
                        <label className="key">Price</label>
                        <p className="value">{productDetails.price}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <label className="key">Quantity</label>
                        <p className="value">{productDetails.quantity}</p>
                    </Col>
                    <Col md={6}>
                        <label className="key">Category</label>
                        <p className="value">{productDetails.category.name}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <label className="key">Description</label>
                        <p className="value">{productDetails.description}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label className="key1">Product picture</label>
                        <div style={{ display: "flex" }}>
                            {productDetails.productPictures.map((picture) => (
                                <div className="productImgContainer">
                                    <img src={generatePublicUrl(picture.img)} />
                                </div>
                            ))}
                        </div>
                    </Col>
                </Row>
            </Modal>
        );
    };

    const showProductDetailModal = (product) => {
        setProductDetails(product);
        setProductDetailsModal(true);
    };

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h3>Product</h3>
                            <button onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>{renderProducts()}</Col>
                </Row>
            </Container>
            {renderAddProductModal()}
            {renderProductDetailsModal()}
        </Layout>
    );
};

export default Products;
