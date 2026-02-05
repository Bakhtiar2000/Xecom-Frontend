import { TQueryParam, TResponseRedux, TTenant } from "@/types";
import { baseApi } from "../../api/baseApi";
import { TCreateTenantDto, TUpdateTenantDto } from "./dto/tenant.dto";

const tenantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //-----------------Get All Tenants-----------------
    getAllTenants: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/tenant",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["tenant"],
      transformResponse: (response: TResponseRedux<TTenant[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    //-----------------Get Single Tenant-----------------
    getSingleTenant: builder.query({
      query: (id: string) => ({
        url: `/tenant/${id}`,
        method: "GET",
      }),
      providesTags: ["tenant"],
      transformResponse: (response: TResponseRedux<TTenant>) => {
        return {
          data: response.data,
        };
      },
    }),

    //-----------------Create Tenant-----------------
    createTenant: builder.mutation({
      query: (data: TCreateTenantDto) => ({
        url: "/tenant",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["tenant"],
    }),

    //-----------------Update Tenant-----------------
    updateTenant: builder.mutation({
      query: (args: { id: string; data: TUpdateTenantDto }) => ({
        url: `/tenant/${args.id}`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["tenant"],
    }),

    //-----------------Delete Tenant-----------------
    deleteTenant: builder.mutation({
      query: (id: string) => ({
        url: `/tenant/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["tenant"],
    }),
  }),
});

export const {
  useGetAllTenantsQuery,
  useGetSingleTenantQuery,
  useCreateTenantMutation,
  useUpdateTenantMutation,
  useDeleteTenantMutation,
} = tenantApi;
