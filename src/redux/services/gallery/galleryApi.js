import { baseApi } from "@/redux/api/baseApi";

const galleryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addGallery: build.mutation({
      query: (data) => {
        return {
          url: "/gallery/",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["gallery"],
    }),
    getGalleries: build.query({
      query: ({ page = 1, limit = 5, search }) => ({
        url: `/gallery?page=${page}&limit=${limit}&searchText=${search}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return {
          meta: response.data?.meta,
          results: response.data?.results,
        };
      },
      providesTags: ["gallery"],
    }),
    getAllGalleries: build.query({
      query: () => ({
        url: `/gallery/`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return { results: response.data?.results };
      },
      providesTags: ["gallery"],
    }),
    getSingleGallery: build.query({
      query: (id) => ({
        url: `/gallery/${id}/`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response.data;
      },
      providesTags: ["gallery"],
    }),
    updateGallery: build.mutation({
      query: (payload) => ({
        url: `/gallery/${payload.id}/`,
        method: "PATCH",
        body: payload.data,
      }),
      invalidatesTags: ["gallery"],
    }),
    deleteGallery: build.mutation({
      query: (id) => ({
        url: `/gallery/${id}/`,
        method: "Delete",
        body: {},
      }),
      invalidatesTags: ["gallery"],
    }),
    deleteBulkGallery: build.mutation({
      query: (payload) => {
        return {
          url: `/gallery/bulk-delete/`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["gallery"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useAddGalleryMutation,
  useGetGalleriesQuery,
  useGetAllGalleriesQuery,
  useGetSingleGalleryQuery,
  useUpdateGalleryMutation,
  useDeleteGalleryMutation,
  useDeleteBulkGalleryMutation,
} = galleryApi;
