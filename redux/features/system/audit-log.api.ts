import { TAuditLog, TQueryParam, TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";

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
