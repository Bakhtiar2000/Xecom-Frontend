import { TQueryParam, TResponseRedux } from "@/types";
import { baseApi } from "@/redux/api/baseApi";
import { TAddDistrictDto, TUpdateDistrictDto } from "./dto/district.dto";
import { TDistrict } from "@/types/location.type";

const districtApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // -----------Get All Districts--------------------

    getAllDistrict: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/district",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["district"],
      transformResponse: (response: TResponseRedux<TDistrict[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    //-----------------Add District-----------------
    addDistrict: builder.mutation({
      query: (data: TAddDistrictDto) => ({
        url: "/district",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["district"],
    }),

    //-----------------Get Single District-----------------
    getSingleDistrict: builder.query({
      query: (id: string) => ({
        url: `/district/${id}`,
        method: "GET",
      }),
      providesTags: ["district"],
      transformResponse: (response: TResponseRedux<TDistrict>) => {
        return {
          data: response.data,
        };
      },
    }),

    //-----------------Update District-----------------

    updateDistrict: builder.mutation({
      query: (args: { id: string; data: TUpdateDistrictDto }) => ({
        url: `/district/${args.id}`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["district"],
    }),

    //-----------------Delete District-----------------
    deleteDistrict: builder.mutation({
      query: (id: string) => ({
        url: `/district/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["district"],
    }),
  }),
});

export const {
  useAddDistrictMutation,
  useGetSingleDistrictQuery,
  useGetAllDistrictQuery,
  useUpdateDistrictMutation,
  useDeleteDistrictMutation,
} = districtApi;
