import { TQueryParam, TResponseRedux } from "@/types";
import { baseApi } from "@/redux/api/baseApi";
import { TCreateOrderDto, TUpdateOrderDto } from "./dto/order.dto";
import { TOrder } from "@/types/order.type";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //-----------------Get All Orders-----------------
    getAllOrders: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/order",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["order"],
      transformResponse: (response: TResponseRedux<TOrder[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    //-----------------Get Single Order-----------------
    getSingleOrder: builder.query({
      query: (id: string) => ({
        url: `/order/${id}`,
        method: "GET",
      }),
      providesTags: ["order"],
      transformResponse: (response: TResponseRedux<TOrder>) => {
        return {
          data: response.data,
        };
      },
    }),

    //-----------------Create Order-----------------
    createOrder: builder.mutation({
      query: (data: TCreateOrderDto) => ({
        url: "/order",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["order"],
    }),

    //-----------------Update Order-----------------
    updateOrder: builder.mutation({
      query: (args: { id: string; data: TUpdateOrderDto }) => ({
        url: `/order/${args.id}`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["order"],
    }),

    //-----------------Cancel Order-----------------
    cancelOrder: builder.mutation({
      query: (id: string) => ({
        url: `/order/${id}/cancel`,
        method: "POST",
      }),
      invalidatesTags: ["order"],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetSingleOrderQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useCancelOrderMutation,
} = orderApi;
