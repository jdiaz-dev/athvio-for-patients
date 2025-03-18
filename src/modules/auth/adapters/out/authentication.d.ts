export type CredentialsSignIn = {
  email: string;
  password: string;
};

export type JwtDto = {
  _id: string;
  role: string;
  token: string;
};

export type SignInRequest = {
  input: CredentialsSignIn;
};

export type SignInResponse = {
  signIn: JwtDto;
};

export type SignUpRequest = {
  input: CredentialsSignIn;
};

export type SignUpResponse = {
  signUpPatientFromMobile: JwtDto;
};
