import baseApi from '../../../Api/baseApi';
import { getTagsByModuleName } from "@/redux/Tag/Tag";

const projects = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Add project
    addProject: builder.mutation({
      query: (data) => ({
        url: "/projects",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('projects'),
    }),

    // Get all projects
    getProjects: builder.query({
      query: () => ({
        url: "/projects",
      }),
      providesTags: getTagsByModuleName('projects'),
    }),

    // Get single project
    getProjectById: builder.query({
      query: (id) => ({
        url: `/projects/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: 'Projects', id }],
    }),

    // Update project
    updateProject: builder.mutation({
      query: ({ id, data }) => ({
        url: `/projects/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('projects'),
    }),

    // Delete project
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: getTagsByModuleName('projects'),
    }),

 
  }),
});

export const {
  useAddProjectMutation,
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projects; 