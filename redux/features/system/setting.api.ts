import { TQueryParam, TResponseRedux } from "@/types";
import { baseApi } from "@/redux/api/baseApi";
import { TAddSettingDto, TUpdateSettingDto } from "./dto/setting.dto";
import { TSetting } from "@/types/system.type";

const settingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //-----------------Get All Settings-----------------
    getAllSettings: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/setting",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["setting"],
      transformResponse: (response: TResponseRedux<TSetting[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    //-----------------Add Setting-----------------
    addSetting: builder.mutation({
      query: (data: TAddSettingDto) => ({
        url: "/setting",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["setting"],
    }),

    //-----------------Update Setting-----------------
    updateSetting: builder.mutation({
      query: (args: { id: string; data: TUpdateSettingDto }) => ({
        url: `/setting/${args.id}`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["setting"],
    }),

    //-----------------Delete Setting-----------------
    deleteSetting: builder.mutation({
      query: (id: string) => ({
        url: `/setting/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["setting"],
    }),
  }),
});

export const {
  useGetAllSettingsQuery,
  useAddSettingMutation,
  useUpdateSettingMutation,
  useDeleteSettingMutation,
} = settingApi;
