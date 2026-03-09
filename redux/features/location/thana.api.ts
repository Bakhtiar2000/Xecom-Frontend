import { TQueryParam, TResponseRedux } from "@/types";
import { baseApi } from "@/redux/api/baseApi";
import { TAddThanaDto, TUpdateThanaDto } from "./dto/thana.dto";
import { TThana } from "@/types/location.type";

const thanaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //-----------------Get All Thanas-----------------
    getAllThanas: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/thana",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["thana"],
      transformResponse: (response: TResponseRedux<TThana[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    //-----------------Add Thana-----------------
    addThana: builder.mutation({
      query: (data: TAddThanaDto) => ({
        url: "/thana",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["thana"],
    }),

    //-----------------Update Thana-----------------
    updateThana: builder.mutation({
      query: (agrs:{id:string,data:TUpdateThanaDto}) => ({
        url: `/thana/${agrs.id}`,
        method: "PUT",
        body: agrs.data,
      }),
      invalidatesTags: ["thana"],
    }),

    //-----------------Delete Thana-----------------
    deleteThana: builder.mutation({
      query: (id: string) => ({
        url: `/thana/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["thana"],
    }),
  }),
});

export const {
  useGetAllThanasQuery,
  useAddThanaMutation,
  useUpdateThanaMutation,
  useDeleteThanaMutation,
} = thanaApi;
