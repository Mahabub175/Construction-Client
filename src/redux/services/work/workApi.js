import { baseApi } from "@/redux/api/baseApi";

const workApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addWork: build.mutation({
      query: (data) => {
        return {
          url: "/work/",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["work"],
    }),
    getWorks: build.query({
      query: ({ page = 1, limit = 5, search }) => ({
        url: `/work?page=${page}&limit=${limit}&searchText=${search}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return {
          meta: response.data?.meta,
          results: response.data?.results,
        };
      },
      providesTags: ["work"],
    }),
    getAllWorks: build.query({
      query: () => ({
        url: `/work/`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return { results: response.data?.results };
      },
      providesTags: ["work"],
    }),
    getSingleWork: build.query({
      query: (id) => ({
        url: `/work/${id}/`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response.data;
      },
      providesTags: ["work"],
    }),
    getSingleWorkBySlug: build.query({
      query: (slug) => ({
        url: `/work/slug/${slug}/`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response.data;
      },
      providesTags: ["work"],
    }),
    updateWork: build.mutation({
      query: (payload) => ({
        url: `/work/${payload.id}/`,
        method: "PATCH",
        body: payload.data,
      }),
      invalidatesTags: ["work"],
    }),
    deleteWork: build.mutation({
      query: (id) => ({
        url: `/work/${id}/`,
        method: "Delete",
        body: {},
      }),
      invalidatesTags: ["work"],
    }),
    deleteBulkWork: build.mutation({
      query: (payload) => {
        return {
          url: `/work/bulk-delete/`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["work"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useAddWorkMutation,
  useGetWorksQuery,
  useGetAllWorksQuery,
  useGetSingleWorkQuery,
  useGetSingleWorkBySlugQuery,
  useUpdateWorkMutation,
  useDeleteWorkMutation,
  useDeleteBulkWorkMutation,
} = workApi;
