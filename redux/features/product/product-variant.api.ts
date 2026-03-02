import { TResponseRedux } from "@/types";
import { baseApi } from "@/redux/api/baseApi";
import { TProductVariant } from "@/types/product.type";

const productVariantApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        //-----------------Get All Product Variants of a Product-----------------
        getAllProductVariantsOfProduct: builder.query({
            query: (productId: string) => ({
                url: `/product-variant/product/${productId}`,
                method: "GET",
            }),
            providesTags: ["productVariant"],
            transformResponse: (response: TResponseRedux<TProductVariant[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        }),
    }),
});

export const {
    useGetAllProductVariantsOfProductQuery,
} = productVariantApi;
