import { createContext } from 'react';
import { CredentialsSignIn } from 'src/modules/authentication/adapters/out/authorization';

export type AuthContextData = {
  isAuthenticated: boolean;
  patient: string | null; //TODO: change name
  assignedProfessional: string;
  fullnameAndSurname: string;
  signInHandler: (credentials: CredentialsSignIn) => Promise<any>;
  signUpHandler: (credentials: CredentialsSignIn) => Promise<any>;
  signOutHandler: () => void;
};

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);
