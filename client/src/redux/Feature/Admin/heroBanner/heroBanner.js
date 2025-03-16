import baseApi from '../../../Api/baseApi';
import { getTagsByModuleName } from "@/redux/Tag/Tag";

const heroBanner = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addHeroBanner: builder.mutation({
      query: (data) => ({
        url: "/hero-banner",
        method: "POST",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('heroBanner'),
    }),

    getHeroBanners: builder.query({
      query: () => ({
        url: "/hero-banner",
      }),
      providesTags: getTagsByModuleName('heroBanner'),
    }),

    updateHeroBanner: builder.mutation({
      query: ({ id, data }) => ({
        url: `/hero-banner/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('heroBanner'),
    }),

    deleteHeroBanner: builder.mutation({
      query: (id) => ({
        url: `/hero-banner/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: getTagsByModuleName('heroBanner'),
    }),
  }),
});

export const {
  useAddHeroBannerMutation,
  useGetHeroBannersQuery,
  useUpdateHeroBannerMutation,
  useDeleteHeroBannerMutation,
} = heroBanner; 