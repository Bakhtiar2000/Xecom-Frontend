import { TDivision, TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";
import { TAddDivisionDto } from "./dto/division.dto";

const divisionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //-----------------Add Division-----------------
    addDivision: builder.mutation({
      query: (data: TAddDivisionDto) => ({
        url: "/division",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["division"],
    }),

    //-----------------Get Single Division-----------------
    getSingleDivision: builder.query({
      query: (id: string) => ({
        url: `/division/${id}`,
        method: "GET",
      }),
      providesTags: ["division"],
      transformResponse: (response: TResponseRedux<TDivision>) => {
        return {
          data: response.data,
        };
      },
    }),
  }),
});

export const { useAddDivisionMutation, useGetSingleDivisionQuery } =
  divisionApi;
