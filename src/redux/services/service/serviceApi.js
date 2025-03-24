import { baseApi } from "@/redux/api/baseApi";

const serviceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addService: build.mutation({
      query: (data) => {
        return {
          url: "/service/",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["service"],
    }),
    getServices: build.query({
      query: ({ page = 1, limit = 5, search }) => ({
        url: `/service?page=${page}&limit=${limit}&searchText=${search}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return {
          meta: response.data?.meta,
          results: response.data?.results,
        };
      },
      providesTags: ["service"],
    }),
    getAllServices: build.query({
      query: () => ({
        url: `/service/`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return { results: response.data?.results };
      },
      providesTags: ["service"],
    }),
    getSingleService: build.query({
      query: (id) => ({
        url: `/service/${id}/`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response.data;
      },
      providesTags: ["service"],
    }),
    updateService: build.mutation({
      query: (payload) => ({
        url: `/service/${payload.id}/`,
        method: "PATCH",
        body: payload.data,
      }),
      invalidatesTags: ["service"],
    }),
    deleteService: build.mutation({
      query: (id) => ({
        url: `/service/${id}/`,
        method: "Delete",
        body: {},
      }),
      invalidatesTags: ["service"],
    }),
    deleteBulkService: build.mutation({
      query: (payload) => {
        return {
          url: `/service/bulk-delete/`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["service"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useAddServiceMutation,
  useGetServicesQuery,
  useGetAllServicesQuery,
  useGetSingleServiceQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useDeleteBulkServiceMutation,
} = serviceApi;
