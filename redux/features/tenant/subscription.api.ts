import { TQueryParam, TResponseRedux } from "@/types";
import { baseApi } from "@/redux/api/baseApi";
import { TCreateSubscriptionDto } from "./dto/subscription.dto";
import { TSubscription } from "@/types/tenant.type";

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
