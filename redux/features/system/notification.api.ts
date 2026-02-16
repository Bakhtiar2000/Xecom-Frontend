import { TNotification, TQueryParam, TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //-----------------Get All Notifications-----------------
    getAllNotifications: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/notification",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["notification"],
      transformResponse: (response: TResponseRedux<TNotification[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    //-----------------Mark Notification as Read-----------------
    markNotificationRead: builder.mutation({
      query: (id: string) => ({
        url: `/notification/${id}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["notification"],
    }),
  }),
});

export const { useGetAllNotificationsQuery, useMarkNotificationReadMutation } =
  notificationApi;
