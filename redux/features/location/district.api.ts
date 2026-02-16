import { TDistrict, TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";
import { TAddDistrictDto } from "./dto/district.dto";

const districtApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});

export const { useAddDistrictMutation, useGetSingleDistrictQuery } =
  districtApi;
