import { baseApi } from "@/redux/api/baseApi";

const stepApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addStep: build.mutation({
      query: (data) => {
        return {
          url: "/step/",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["step"],
    }),
    getSteps: build.query({
      query: ({ page = 1, limit = 5, search }) => ({
        url: `/step?page=${page}&limit=${limit}&searchText=${search}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return {
          meta: response.data?.meta,
          results: response.data?.results,
        };
      },
      providesTags: ["step"],
    }),
    getAllSteps: build.query({
      query: () => ({
        url: `/step/`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return { results: response.data?.results };
      },
      providesTags: ["step"],
    }),
    getSingleStep: build.query({
      query: (id) => ({
        url: `/step/${id}/`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response.data;
      },
      providesTags: ["step"],
    }),
    updateStep: build.mutation({
      query: (payload) => ({
        url: `/step/${payload.id}/`,
        method: "PATCH",
        body: payload.data,
      }),
      invalidatesTags: ["step"],
    }),
    deleteStep: build.mutation({
      query: (id) => ({
        url: `/step/${id}/`,
        method: "Delete",
        body: {},
      }),
      invalidatesTags: ["step"],
    }),
    deleteBulkStep: build.mutation({
      query: (payload) => {
        return {
          url: `/step/bulk-delete/`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["step"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useAddStepMutation,
  useGetStepsQuery,
  useGetAllStepsQuery,
  useGetSingleStepQuery,
  useUpdateStepMutation,
  useDeleteStepMutation,
  useDeleteBulkStepMutation,
} = stepApi;
