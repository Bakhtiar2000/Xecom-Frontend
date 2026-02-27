import { TQueryParam, TResponseRedux } from "@/types";
import { baseApi } from "@/redux/api/baseApi";
import { TProduct } from "@/types/product.type";
import { TProductMetadata } from "./dto/product.dto";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //-----------------Get All Products-----------------
    getAllProducts: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/product",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["product"],
      transformResponse: (response: TResponseRedux<TProduct[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    //-----------------Get Single Product-----------------
    getSingleProduct: builder.query({
      query: (id: string) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
      providesTags: ["product"],
      transformResponse: (response: TResponseRedux<TProduct>) => {
        return {
          data: response.data,
        };
      },
    }),

    //-----------------Add Product-----------------
    addProduct: builder.mutation({
      query: (data: FormData) => ({
        url: "/product",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),

    //-----------------Update Product-----------------
    updateProduct: builder.mutation({
      query: (args: { id: string; data: FormData }) => ({
        url: `/product/${args.id}`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["product"],
    }),
    // -------------product Metadata............
    getProductMetadata: builder.query({
      query: () => ({
        url: "/product/metadata",
        method: "GET",
      }),
      providesTags: ["product"],
      transformResponse: (response: TResponseRedux<TProductMetadata>) => {
        return {
          data: response.data,
        };
      },
    }),

    //-----------------Delete Product-----------------
    deleteProduct: builder.mutation({
      query: (id: string) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});


export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useGetProductMetadataQuery,
  useDeleteProductMutation,
} = productApi;
