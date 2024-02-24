import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../../features/auth/authSlice";

// fetch the url and set headers with Bearer token
const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:3500",
    // send back our http only secure cookie
    // the cookie is send with every query
    // attach credentials in cookie every time
    credentials: "include",
    // prepare the header with Bearer token
    prepareHeaders: (headers, { getState }) => {
        // define token
        const token = getState().auth.token;

        // set Bearer token headers
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        // attach access token with every request
        return headers;
    },
});

// create wrapper for baseQuery, to create a refresh Token in case the original one expired/failed
// this will get us a new access token
// create baseQuery with Re-auth
const baseQueryWithReauth = async (args, api, extraOptions) => {
    // wrap around the baseQuery
    let result = await baseQuery(args, api, extraOptions);

    // 403 forbidden - if we send an access token that would have been valid but expired
    if (result?.error?.originalStatus === 403) {
        console.log("Sending refresh token");

        // send the refresh token to get new access token
        const refreshResult = await baseQuery("/refresh", api, extraOptions);
        console.log("refresh result, ", refreshResult);

        if (refreshResult?.data) {
            // get user
            const user = api.getState().auth.state;
            // store the new token
            api.dispatch(setCredentials({ ...refreshResult.data, user }));

            // retry the orignial query with new access token
            result = await baseQuery(args, api, extraOptions);
        }
    } else {
        api.dispatch(logOut());
    }

    return result;
};

// create API
export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({}),
});
