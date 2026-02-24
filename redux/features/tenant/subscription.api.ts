import { TQueryParam, TResponseRedux, TSubscription } from "@/types";
import { baseApi } from "../../api/baseApi";
import { TCreateSubscriptionDto } from "./dto/subscription.dto";

const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //-----------------Get All Subscriptions-----------------
    getAllSubscriptions: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/subscription",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["subscription"],
      transformResponse: (response: TResponseRedux<TSubscription[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    //-----------------Create Subscription-----------------
    createSubscription: builder.mutation({
      query: (data: TCreateSubscriptionDto) => ({
        url: "/subscription",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["subscription"],
    }),
  }),
});

export const { useGetAllSubscriptionsQuery, useCreateSubscriptionMutation } = subscriptionApi;
