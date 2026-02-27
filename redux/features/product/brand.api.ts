import { TQueryParam, TResponseRedux } from "@/types";
import { baseApi } from "@/redux/api/baseApi";
import { TBrandMetadata } from "./dto/brand.dto";
import { TBrand } from "@/types/product.type";

const brandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //-----------------Get All Brands-----------------
    getAllBrands: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/brand",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["brand"],
      transformResponse: (response: TResponseRedux<TBrand[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    //-----------------Get Single Brand-----------------
    getSingleBrand: builder.query({
      query: (id: string) => ({
        url: `/brand/${id}`,
        method: "GET",
      }),
      providesTags: ["brand"],
      transformResponse: (response: TResponseRedux<TBrand>) => {
        return {
          data: response.data,
        };
      },
    }),

    //-----------------Get Brand Metadata-----------------
    getBrandMetadata: builder.query({
      query: () => {
        return {
          url: "/brand/metadata",
          method: "GET",
        };
      },
      providesTags: ["brand"],
      transformResponse: (response: TResponseRedux<TBrandMetadata>) => {
        return {
          data: response.data,
        };
      },
    }),

    //-----------------Add Brand-----------------
    addBrand: builder.mutation({
      query: (data: FormData) => ({
        url: "/brand",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["brand"],
    }),

    //-----------------Update Brand-----------------
    updateBrand: builder.mutation({
      query: (args: { id: string; data: FormData }) => ({
        url: `/brand/${args.id}`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["brand"],
    }),

    //-----------------Delete Brand-----------------
    deleteBrand: builder.mutation({
      query: (id: string) => ({
        url: `/brand/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["brand"],
    }),
  }),
});

export const {
  useGetAllBrandsQuery,
  useGetSingleBrandQuery,
  useAddBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
  useGetBrandMetadataQuery,
} = brandApi;
