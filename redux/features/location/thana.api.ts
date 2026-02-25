import { baseApi } from "@/redux/api/baseApi";
import { TAddThanaDto } from "./dto/thana.dto";

const thanaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //-----------------Add Thana-----------------
    addThana: builder.mutation({
      query: (data: TAddThanaDto) => ({
        url: "/thana",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["thana"],
    }),
  }),
});

export const { useAddThanaMutation } = thanaApi;
