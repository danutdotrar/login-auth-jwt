import React from "react";
import { Link } from "react-router-dom";

const Public = () => {
    return (
        <>
            <h1>Public.js</h1>
            <h2>Employee Login</h2>
            <Link to="/login">Login</Link>
        </>
    );
};

export default Public;
