import { TCategory, TQueryParam, TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";
import { TAddCategoryDto, TUpdateCategoryDto } from "./dto/category.dto";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //-----------------Get All Categories-----------------
    getAllCategories: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/category",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["category"],
      transformResponse: (response: TResponseRedux<TCategory[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    //-----------------Get Single Category-----------------
    getSingleCategory: builder.query({
      query: (id: string) => ({
        url: `/category/${id}`,
        method: "GET",
      }),
      providesTags: ["category"],
      transformResponse: (response: TResponseRedux<TCategory>) => {
        return {
          data: response.data,
        };
      },
    }),

    //-----------------Add Category-----------------
    addCategory: builder.mutation({
      query: (data: FormData) => ({
        url: "/category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),

    //-----------------Update Category-----------------
    updateCategory: builder.mutation({
      query: (args: { id: string; data: FormData }) => ({
        url: `/category/${args.id}`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["category"],
    }),

    //-----------------Delete Category-----------------
    deleteCategory: builder.mutation({
      query: (id: string) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetSingleCategoryQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
