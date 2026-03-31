import { TQueryParam, TResponseRedux, TStaff } from "@/types";
import { baseApi } from "@/redux/api/baseApi";
import { TRegisterStaffDto } from "./dto/staff.dto";
import { TAddAddressDto } from "./dto/user.dto";

const staffApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //-----------------Get All Staffs-----------------
    getAllStaffs: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/staff",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["staff"],
      transformResponse: (response: TResponseRedux<TStaff[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    //-----------------Register Staff-----------------
    registerStaff: builder.mutation({
      query: (data: TRegisterStaffDto) => ({
        url: "/staff/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["staff", "user"],
    }),
  }),
});

export const { useGetAllStaffsQuery, useRegisterStaffMutation } = staffApi;
