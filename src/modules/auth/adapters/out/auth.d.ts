export type CredentialsSignIn = {
  email: string;
  password: string;
};

export type JwtDto = {
  uuid: string;
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

export type AuthInitialState = {
  auth: { data: any; error: string | null };
};
