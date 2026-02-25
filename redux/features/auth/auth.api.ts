import { baseApi } from "@/redux/api/baseApi";
import {
  TLoginDto,
  TChangePasswordDto,
  TForgotPasswordDto,
  TResetPasswordDto,
} from "./dto/auth.dto";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //-----------------Login User-----------------
    login: builder.mutation({
      query: (data: TLoginDto) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),

    //-----------------Refresh Token-----------------
    refreshToken: builder.mutation({
      query: () => ({
        url: "/auth/refresh-token",
        method: "POST",
      }),
    }),

    //-----------------Change Password-----------------
    changePassword: builder.mutation({
      query: (data: TChangePasswordDto) => ({
        url: "/auth/change-password",
        method: "PATCH",
        body: data,
      }),
    }),

    //-----------------Forgot Password-----------------
    forgotPassword: builder.mutation({
      query: (data: TForgotPasswordDto) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    //-----------------Reset Password-----------------
    resetPassword: builder.mutation({
      query: (data: TResetPasswordDto) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRefreshTokenMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
