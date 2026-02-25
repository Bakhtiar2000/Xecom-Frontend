import { TQueryParam, TResponseRedux } from "@/types";
import { baseApi } from "@/redux/api/baseApi";
import {
  TAddAttributeDto,
  TUpdateAttributeDto,
  TAddAttributeValueDto,
  TUpdateAttributeValueDto,
} from "./dto/attribute.dto";
import { TAttribute } from "@/types/product.type";

const attributeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //-----------------Get All Attributes-----------------
    getAllAttributes: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/attribute",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["attribute"],
      transformResponse: (response: TResponseRedux<TAttribute[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    //-----------------Get Single Attribute-----------------
    getSingleAttribute: builder.query({
      query: (id: string) => ({
        url: `/attribute/${id}`,
        method: "GET",
      }),
      providesTags: ["attribute"],
      transformResponse: (response: TResponseRedux<TAttribute>) => {
        return {
          data: response.data,
        };
      },
    }),

    //-----------------Add Attribute-----------------
    addAttribute: builder.mutation({
      query: (data: TAddAttributeDto) => ({
        url: "/attribute",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["attribute"],
    }),

    //-----------------Add Attribute Value-----------------
    addAttributeValue: builder.mutation({
      query: (data: TAddAttributeValueDto) => ({
        url: "/attribute/attribute-value",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["attribute", "attributeValue"],
    }),

    //-----------------Update Attribute-----------------
    updateAttribute: builder.mutation({
      query: (args: { id: string; data: TUpdateAttributeDto }) => ({
        url: `/attribute/${args.id}`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["attribute"],
    }),

    //-----------------Update Attribute Value-----------------
    updateAttributeValue: builder.mutation({
      query: (args: { id: string; data: TUpdateAttributeValueDto }) => ({
        url: `/attribute/attribute-value/${args.id}`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["attribute", "attributeValue"],
    }),

    //-----------------Delete Attribute-----------------
    deleteAttribute: builder.mutation({
      query: (id: string) => ({
        url: `/attribute/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["attribute"],
    }),

    //-----------------Delete Attribute Value-----------------
    deleteAttributeValue: builder.mutation({
      query: (id: string) => ({
        url: `/attribute/attribute-value/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["attribute", "attributeValue"],
    }),
  }),
});

export const {
  useGetAllAttributesQuery,
  useGetSingleAttributeQuery,
  useAddAttributeMutation,
  useAddAttributeValueMutation,
  useUpdateAttributeMutation,
  useUpdateAttributeValueMutation,
  useDeleteAttributeMutation,
  useDeleteAttributeValueMutation,
} = attributeApi;
