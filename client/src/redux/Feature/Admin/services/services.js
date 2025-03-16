import baseApi from '../../../Api/baseApi';
import { getTagsByModuleName } from "@/redux/Tag/Tag";

const services = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Add service
    addService: builder.mutation({
      query: (data) => ({
        url: "/services",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('services'),
    }),

    // Get all services
    getServices: builder.query({
      query: () => ({
        url: "/services",
      }),
      providesTags: getTagsByModuleName('services'),
    }),

  

    // Update service
    updateService: builder.mutation({
      query: ({ id, data }) => ({
        url: `/services/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('services'),
    }),

    // Delete service
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/services/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: getTagsByModuleName('services'),
    }),
  }),
});

export const {
  useAddServiceMutation,
  useGetServicesQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = services;
