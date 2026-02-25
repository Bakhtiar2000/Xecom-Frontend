import { TQueryParam, TResponseRedux } from "@/types";
import { baseApi } from "@/redux/api/baseApi";
import { TAuditLog } from "@/types/system.type";

const auditLogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //-----------------Get All Audit Logs-----------------
    getAllAuditLogs: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/audit-log",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TAuditLog[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
  }),
});

export const { useGetAllAuditLogsQuery } = auditLogApi;
