import { TQueryParam, TResponseRedux } from "@/types";
import { baseApi } from "@/redux/api/baseApi";
import { TWishlist } from "@/types/product.type";
import { TAddWishlistDto } from "./dto/wishlist.dto";

const wishlistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //-----------------Get All Wishlists-----------------
    getAllWishlists: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/wishlist",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["wishlist"],
      transformResponse: (response: TResponseRedux<TWishlist[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    //-----------------Add Product to Wishlist-----------------
    addToWishlist: builder.mutation({
      query: (data: TAddWishlistDto) => ({
        url: "/wishlist",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["wishlist"],
    }),

    //-----------------Remove Product from Wishlist-----------------
    removeFromWishlist: builder.mutation({
      query: (id: string) => ({
        url: `/wishlist/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["wishlist"],
    }),
  }),
});

export const { useGetAllWishlistsQuery, useAddToWishlistMutation, useRemoveFromWishlistMutation } =
  wishlistApi;
