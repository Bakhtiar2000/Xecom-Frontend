import { TAdmin, TQueryParam, TResponseRedux } from "@/types";
import { baseApi } from "@/redux/api/baseApi";
import { TRegisterAdminDto } from "./dto/admin.dto";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //-----------------Get All Admins-----------------
    getAllAdmins: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/admin",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["admin"],
      transformResponse: (response: TResponseRedux<TAdmin[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    //-----------------Register Admin-----------------
    registerAdmin: builder.mutation({
      query: (data: TRegisterAdminDto) => ({
        url: "/admin/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["admin", "user"],
    }),
  }),
});

export const { useGetAllAdminsQuery, useRegisterAdminMutation } = adminApi;
