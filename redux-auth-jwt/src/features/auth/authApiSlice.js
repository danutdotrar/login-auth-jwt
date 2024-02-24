import { apiSlice } from "../../app/api/apiSlice";

// extended slice
export const authApiSlice = apiSlice.injectEndpoints({
    // define endpoints
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "/auth",
                method: "POST",
                body: { ...credentials },
            }),
        }),
    }),
});

export const { useLoginMutation } = authApiSlice;
