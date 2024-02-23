import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../../features/auth/authSlice";

// fetch the url and set headers token
const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:3500",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        // attach access token to headers everytime
        const token = getState().auth.token;

        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }

        return headers;
    },
});

// create wrapper for base query
const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    // 403 forbidden, 401 not authorized
    if (result?.error?.originalStatus === 403) {
        console.log("sending refresh token");
        // send refresh token to get new access token
        const refreshResult = await baseQuery("/refresh", api, extraOptions);
        console.log(refreshResult);

        if (refreshResult?.data) {
            const user = api.getState().auth.user;

            // store new token
            api.dispatch(setCredentials({ ...refreshResult.data, user }));
            // retry the original query with access token
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logOut());
        }
    }
    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({}),
});
