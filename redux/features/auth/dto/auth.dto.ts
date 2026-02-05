export type TLoginDto = {
  email: string;
  password: string;
};

export type TLoginResponse = {
  accessToken: string;
  user: {
    id: string;
    email: string;
    role: string;
    name: string;
  };
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
