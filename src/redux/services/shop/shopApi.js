import { baseApi } from "@/redux/api/baseApi";

const shopApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addShop: build.mutation({
      query: (data) => {
        return {
          url: "/shop/",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["shop"],
    }),
    getShops: build.query({
      query: ({ page = 1, limit = 5, search }) => ({
        url: `/shop?page=${page}&limit=${limit}&searchText=${search}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return {
          meta: response.data?.meta,
          results: response.data?.results,
        };
      },
      providesTags: ["shop"],
    }),
    getAllShops: build.query({
      query: () => ({
        url: `/shop/`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return { results: response.data?.results };
      },
      providesTags: ["shop"],
    }),
    getSingleShop: build.query({
      query: (id) => ({
        url: `/shop/${id}/`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response.data;
      },
      providesTags: ["shop"],
    }),
    updateShop: build.mutation({
      query: (payload) => ({
        url: `/shop/${payload.id}/`,
        method: "PATCH",
        body: payload.data,
      }),
      invalidatesTags: ["shop"],
    }),
    deleteShop: build.mutation({
      query: (id) => ({
        url: `/shop/${id}/`,
        method: "Delete",
        body: {},
      }),
      invalidatesTags: ["shop"],
    }),
    deleteBulkShop: build.mutation({
      query: (payload) => {
        return {
          url: `/shop/bulk-delete/`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["shop"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useAddShopMutation,
  useGetShopsQuery,
  useGetAllShopsQuery,
  useGetSingleShopQuery,
  useUpdateShopMutation,
  useDeleteShopMutation,
  useDeleteBulkShopMutation,
} = shopApi;
