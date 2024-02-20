import React from "react";
import Layout from "../../components/Layouts";

import "../Home/styles.css";

const Home = (props) => {
    console.log("inside home page of admin application");
    console.log(props);
    return <Layout sidebar></Layout>;
};

export default Home;
