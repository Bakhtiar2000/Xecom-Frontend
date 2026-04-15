export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  STAFF = "STAFF",
  CUSTOMER = "CUSTOMER",
}

export type TLoginDto = {
  email: string;
  password: string;
};

export type TGoogleLoginDto = {
  email: string;
  name: string;
  profilePicture: string;
};

export type TLoginResponse = {
  accessToken: string;
};

export type TChangePasswordDto = {
  password: string;
  newPassword: string;
};

export type TForgotPasswordDto = {
  email: string;
};

export type TResetPasswordDto = {
  newPassword: string;
};
