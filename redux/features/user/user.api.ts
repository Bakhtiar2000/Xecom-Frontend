import { baseApi } from "@/redux/api/baseApi";
import { TAdmin, TCustomer, TResponseRedux, TStaff } from "@/types";

const user = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        //-----------------Get Me-----------------
        getMe: builder.query({
            query: () => {
                return {
                    url: "users/me/",
                    method: "GET"
                };
            },
            providesTags: ["user"],
            transformResponse: (response: TResponseRedux<TAdmin | TCustomer | TStaff>) => {
                return {
                    data: response.data,
                };
            },
        }),
    }),
});

export const { useGetMeQuery } = user;
