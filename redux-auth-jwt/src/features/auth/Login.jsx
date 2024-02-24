import React from "react";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();

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
            console.log("userData ,", userData);

            dispatch(setCredentials({ ...userData, user }));
            setUser("");
            setPwd("");

            navigate("/welcome");
        } catch (error) {
            if (!err?.originalStatus) {
                setErrMsg("No Server response");
            } else if (err.originalStatus?.status === 400) {
                setErrMsg("Missing Username or Password");
            } else if (err.originalStatus?.status === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Login failed");
            }

            errRef.current.focus();
        }
    };

    const handleUserInput = (e) => setUser(e.target.value);
    const handlePwdInput = (e) => setPwd(e.target.value);

    const content = isLoading ? (
        <h1>Loading...</h1>
    ) : (
        <section className="login">
            <h1>Employee Login</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    value={user}
                    name="username"
                    onChange={handleUserInput}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="text"
                    id="password"
                    ref={pwdRef}
                    value={pwd}
                    name="password"
                    onChange={handlePwdInput}
                    required
                />
            </form>
        </section>
    );

    return <div>{content}</div>;
};

export default Login;
