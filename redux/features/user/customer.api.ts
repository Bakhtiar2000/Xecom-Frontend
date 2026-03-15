import { TCustomer, TQueryParam, TResponseRedux } from "@/types";
import { baseApi } from "@/redux/api/baseApi";
import { TRegisterCustomerDto } from "./dto/customer.dto";
import { TAddAddressDto } from "./dto/user.dto";

const customerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //-----------------Get All Customers-----------------
    getAllCustomers: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/customer",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["customer"],
      transformResponse: (response: TResponseRedux<TCustomer[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    //-----------------Register Customer-----------------
    registerCustomer: builder.mutation({
      query: (data: TRegisterCustomerDto) => ({
        url: "/customer/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["customer", "user"],
    }),



    //-----------------Add Staff Address-----------------
    addUserAddress: builder.mutation({
      query: (data: TAddAddressDto) => ({
        url: "/customer/address",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["customer", "address"],
    }),


  }),
});

export const { useGetAllCustomersQuery, useRegisterCustomerMutation } = customerApi;
