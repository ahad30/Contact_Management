import baseApi from '../../../Api/baseApi';
import { getTagsByModuleName } from "@/redux/Tag/Tag";

const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addContact: builder.mutation({
      query: (data) => ({
        url: "/contact",
        method: "POST",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('contact'),
    }),

    getContacts: builder.query({
      query: () => ({
        url: "/contact",
      }),
      providesTags: getTagsByModuleName('contact'),
    }),

    updateContact: builder.mutation({
      query: ({ id, data }) => ({
        url: `/contact/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('contact'),
    }),

    deleteContact: builder.mutation({
      query: (id) => ({
        url: `/contact/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: getTagsByModuleName('contact'),
    }),

    downloadContactsPDF: builder.query({
      query: () => ({
        url: "/contact/pdf",
        method: "GET",
        responseHandler: async (response) => {
          if (!response.ok) {
            throw new Error("Failed to download PDF");
          }
          const blob = await response.blob();
          return URL.createObjectURL(blob);
        },
      }),
      providesTags: getTagsByModuleName('contact'),
    }),

    downloadContactsExcel: builder.query({
      query: () => ({
        url: "/contact/excel",
        method: "GET",
        responseHandler: async (response) => {
          if (!response.ok) {
            throw new Error("Failed to download Excel");
          }
          const blob = await response.blob();
          return URL.createObjectURL(blob);
        },
      }),
      providesTags: getTagsByModuleName('contact'),
    }),
  }),
});

export const {
  useAddContactMutation,
  useGetContactsQuery,
  useUpdateContactMutation,
  useDeleteContactMutation,
  useDownloadContactsPDFQuery,
  useDownloadContactsExcelQuery,
} = contactApi;