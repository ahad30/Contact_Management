import baseApi from "@/redux/Api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        headers: {
          'Content-Type': 'application/json',
        },
        method: "POST",
        body: data,
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        headers: {
          'Content-Type': 'application/json',
        },
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        credentials: "include", // Important to include cookies in the request
      }),
    }),
  }),
});

export const { 
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation, // Export the new logout mutation
} = authApi;
