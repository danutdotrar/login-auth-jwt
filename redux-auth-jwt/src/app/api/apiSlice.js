import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../../features/auth/authSlice";

// fetch the url and set headers token
const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:3500",
    // send back our http only secure cookie
    // the cookie is send with every query
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {},
});
