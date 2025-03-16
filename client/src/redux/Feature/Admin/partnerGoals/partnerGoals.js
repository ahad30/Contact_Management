import baseApi from '../../../Api/baseApi';
import { getTagsByModuleName } from "@/redux/Tag/Tag";

const partnerGoals = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addPartnerGoals: builder.mutation({
      query: (data) => ({
        url: "/partner-goals",
        method: "POST",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('partnerGoals'),
    }),

    getPartnerGoals: builder.query({
      query: () => ({
        url: "/partner-goals",
      }),
      providesTags: getTagsByModuleName('partnerGoals'),
    }),

    updatePartnerGoals: builder.mutation({
      query: ({ id, data }) => ({
        url: `/partner-goals/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('partnerGoals'),
    }),

    deletePartnerGoals: builder.mutation({
      query: (id) => ({
        url: `/partner-goals/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: getTagsByModuleName('partnerGoals'),
    }),
  }),
});

export const {
  useAddPartnerGoalsMutation,
  useGetPartnerGoalsQuery,
  useUpdatePartnerGoalsMutation,
  useDeletePartnerGoalsMutation,
} = partnerGoals; 