import { TQueryParam, TResponseRedux } from "@/types";
import { baseApi } from "@/redux/api/baseApi";
import { TAddCountryDto } from "./dto/country.dto";
import { TCountry } from "@/types/location.type";

const countryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //-----------------Add Country-----------------
    addCountry: builder.mutation({
      query: (data: TAddCountryDto) => ({
        url: "/country",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["country"],
    }),

    //-----------------Get All Countries-----------------
    getAllCountries: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/country",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["country"],
      transformResponse: (response: TResponseRedux<TCountry[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    //-----------------Get Single Country-----------------
    getSingleCountry: builder.query({
      query: (id: string) => ({
        url: `/country/${id}`,
        method: "GET",
      }),
      providesTags: ["country"],
      transformResponse: (response: TResponseRedux<TCountry>) => {
        return {
          data: response.data,
        };
      },
    }),
  }),
});

export const { useAddCountryMutation, useGetAllCountriesQuery, useGetSingleCountryQuery } =
  countryApi;
