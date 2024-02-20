import React, { useState, useEffect } from "react";
import Layout from "../../components/Layouts";
import Modal from "../../components/UI/Modal";
import Input from "../../components/UI/Input";
import { Row, Col, Container } from "react-bootstrap";
import linearCategories from "../../helpers/linearCategories";
import { useSelector, useDispatch } from "react-redux";
import { createPage } from "../../actions";

const NewPage = (props) => {
    const [createModal, setCreateModal] = useState(false);
    const [title, setTitle] = useState("");
    const category = useSelector((state) => state.category);
    const [categoryId, setCategoryId] = useState("");
    const [type, setType] = useState("");
    const [categories, setCategories] = useState([]);
    const [desc, setDesc] = useState("");
    const [banners, setBanners] = useState([]);
    const [products, setProducts] = useState([]);
    const [catid, setCatid] = useState("");
    const page = useSelector((state) => state.page);
    const dispatch = useDispatch();

    useEffect(() => {
        setCategories(linearCategories(category.categories));
    }, [category]);

    useEffect(() => {
        console.log(page);
        if (!page.loading) {
            setCreateModal(false);
            setTitle("");
            setType("");
            setDesc("");
            setCategoryId("");
            setCatid("");
            setBanners([]);
            setProducts([]);
        }
    }, [page]);

    const handleBannerImages = (e) => {
        setBanners([...banners, e.target.files[0]]);
    };
    const handleProductImages = (e) => {
        setProducts([...products, e.target.files[0]]);
    };
    const onCategoryChange = (e) => {
        const category = categories.find((category) => category.value === e.target.value);

        console.log(category);
        setCategoryId(category.value);
        setCatid(category.value);

        setType(category.type);
    };

    const submitPageForm = (e) => {
        if (title === "") {
            alert("Title is Required");
            setCreateModal(false);
            return;
        }

        const form = new FormData();

        form.append("title", title);
        form.append("description", desc);
        form.append("category", categoryId);
        form.append("type", type);
        banners.forEach((banner, index) => {
            form.append("banners", banner);
        });
        products.forEach((product, index) => {
            form.append("products", product);
        });
        dispatch(createPage(form));
    };

    const renderCreatePageModal = () => {
        return (
            <Modal
                show={createModal}
                modelTitle={"Create New Page"}
                handleClose={() => setCreateModal(false)}
                onSubmit={submitPageForm}
            >
                <Container>
                    <Row>
                        <Col>
                            {/* <select
                                className="form-control form-control-sm "
                                value={categoryId}
                                onChange={onCategoryChange}
                            >
                                <option value="">Select category</option>
                                {categories.map((category) => (
                                    <option key={category._id} value={category.value}>
                                        {category.name}
                                    </option>
                                ))}
                            </select> */}
                            <Input
                                type="select"
                                value={categoryId}
                                placeholder="Enter category"
                                onChange={onCategoryChange}
                                options={categories}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder={"Page Title"}
                                className="form-control-sm "
                            ></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                placeholder={"Page Desc"}
                                className="form-control-sm "
                            />
                        </Col>
                    </Row>
                    {banners.length !== 0
                        ? banners.map((banner, index) => (
                              <Row key={index}>
                                  <Col>{banner.name}</Col>
                              </Row>
                          ))
                        : null}
                    <Row>
                        <Col>
                            <Input
                                className="form-control form-control-sm "
                                type="file"
                                name="banners"
                                onChange={handleBannerImages}
                            />
                        </Col>
                    </Row>
                    {products.length > 0
                        ? products.map((product, index) => (
                              <Row key={index}>
                                  <Col>{product.name}</Col>
                              </Row>
                          ))
                        : null}
                    <Row>
                        <Col>
                            <Input
                                className="form-control form-control-sm "
                                type="file"
                                name="products"
                                onChange={handleProductImages}
                            />
                        </Col>
                    </Row>
                </Container>
            </Modal>
        );
    };
    return (
        <Layout sidebar>
            {page.loading ? (
                <p>loading please wait</p>
            ) : (
                <>
                    {renderCreatePageModal()}
                    <button onClick={() => setCreateModal(true)}>Create Page</button>
                </>
            )}
        </Layout>
    );
};

export default NewPage;
