import { createContext } from 'react';
import { CredentialsSignIn } from 'src/modules/authentication/adapters/out/authorization';

export type AuthContextData = {
  isAuthenticated: boolean;
  patient: string; //TODO: change name
  signInHandler: (credentials: CredentialsSignIn) => Promise<any>;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);
