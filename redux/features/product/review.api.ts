import { TQueryParam, TResponseRedux } from "@/types";
import { baseApi } from "@/redux/api/baseApi";
import { TReview } from "@/types/product.type";
import { TAddReviewDto, TUpdateReviewDto, TApproveReviewDto } from "./dto/review.dto";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //-----------------Get All Reviews of a Product-----------------
    getAllReviewsOfProduct: builder.query({
      query: (args: { productId: string; queryParams?: TQueryParam[] }) => {
        const params = new URLSearchParams();

        if (args.queryParams) {
          args.queryParams.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: `/review/product/${args.productId}`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["review"],
      transformResponse: (response: TResponseRedux<TReview[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    //-----------------Get My Reviews-----------------
    getMyReviews: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/review/my-reviews",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["review"],
      transformResponse: (response: TResponseRedux<TReview[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    //-----------------Add a Review-----------------
    addReview: builder.mutation({
      query: (data: TAddReviewDto) => ({
        url: "/review",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["review"],
    }),

    //-----------------Update a Review-----------------
    updateReview: builder.mutation({
      query: (args: { id: string; data: TUpdateReviewDto }) => ({
        url: `/review/${args.id}`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["review"],
    }),

    //-----------------Delete a Review-----------------
    deleteReview: builder.mutation({
      query: (id: string) => ({
        url: `/review/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["review"],
    }),

    //-----------------Approve Review-----------------
    approveReview: builder.mutation({
      query: (args: { id: string; data: TApproveReviewDto }) => ({
        url: `/review/${args.id}/approve`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["review"],
    }),
  }),
});

export const {
  useGetAllReviewsOfProductQuery,
  useGetMyReviewsQuery,
  useAddReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useApproveReviewMutation,
} = reviewApi;
