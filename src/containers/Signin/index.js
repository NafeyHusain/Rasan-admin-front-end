import React, { useState } from "react";
import Layout from "../../components/Layouts";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Input from "../../components/UI/Input";
import { login } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Signin = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const userLogin = (e) => {
        e.preventDefault();
        const user = { email, password };
        dispatch(login(user));
    };
    if (auth.authenticate) {
        return <Navigate to={`/`} />;
    }
    return (
        <Layout>
            <Container>
                <Row style={{ marginTop: "60px" }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={userLogin}>
                            <Input
                                label="Email address"
                                type="email"
                                placeholder="Enter email"
                                errormessage="We'll never share your email with anyone else"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                label="Password"
                                type="text"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default Signin;
