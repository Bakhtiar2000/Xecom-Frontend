import { TQueryParam, TResponseRedux } from "@/types";
import { baseApi } from "@/redux/api/baseApi";
import { TAddInventoryLogDto } from "./dto/inventory-log.dto";
import { TInventoryLog } from "@/types/inventory.type";

const inventoryLogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //-----------------Get All Inventory Logs-----------------
    getAllInventoryLogs: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/inventory-log",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TInventoryLog[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    //-----------------Add Inventory Log-----------------
    addInventoryLog: builder.mutation({
      query: (data: TAddInventoryLogDto) => ({
        url: "/inventory-log",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllInventoryLogsQuery, useAddInventoryLogMutation } = inventoryLogApi;
