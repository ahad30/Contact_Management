import baseApi from '../../../Api/baseApi';
import { getTagsByModuleName } from "@/redux/Tag/Tag";

const testimonials = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTestimonial: builder.mutation({
      query: (data) => ({
        url: "/testimonials",
        method: "POST",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('testimonials'),
    }),

    getTestimonials: builder.query({
      query: () => "/testimonials",
      providesTags: getTagsByModuleName('testimonials'),
    }),

    updateTestimonial: builder.mutation({
      query: ({ id, data }) => ({
        url: `/testimonials/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('testimonials'),
    }),

    deleteTestimonial: builder.mutation({
      query: (id) => ({
        url: `/testimonials/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: getTagsByModuleName('testimonials'),
    }),
  }),
});

export const {
  useAddTestimonialMutation,
  useGetTestimonialsQuery,
  useUpdateTestimonialMutation,
  useDeleteTestimonialMutation,
} = testimonials; 