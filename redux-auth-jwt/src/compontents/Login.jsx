import React from "react";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { useLoginMutation } from "../features/auth/authApiSlice";

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();
    const [user, setUser] = useState("");
    const [pwr, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();

    const [login, { isLoading }] = useState("");
    const dipsatch = useDispatch();

    useEffect(() => {
        // set the focus on userRef when the component loads
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [user, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = await login({ user, pwd }).unwrap();
        } catch (error) {
            return error;
        }
    };

    return <div>Login</div>;
};

export default Login;
