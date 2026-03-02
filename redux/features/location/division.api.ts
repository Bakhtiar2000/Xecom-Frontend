import { TQueryParam, TResponseRedux } from "@/types";
import { baseApi } from "@/redux/api/baseApi";
import { TAddDivisionDto, TUpdateDivisionDto } from "./dto/division.dto";
import { TDivision } from "@/types/location.type";

const divisionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // -----------Get All Divisions--------------------

    getAllDivison: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/division",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["division"],
      transformResponse: (response: TResponseRedux<TDivision[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

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

    //-----------------Update Division-----------------

    updateDivision: builder.mutation({
      query: (data: TUpdateDivisionDto) => ({
        url: "/division",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["division"],
    }),

    //-----------------Delete Division-----------------
    deleteDivision: builder.mutation({
      query: (id: string) => ({
        url: `/division/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["division"],
    }),
  }),
});

export const {
  useAddDivisionMutation,
  useGetSingleDivisionQuery,
  useUpdateDivisionMutation,
  useDeleteDivisionMutation,
  useGetAllDivisonQuery,
} = divisionApi;
