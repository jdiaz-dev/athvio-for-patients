import { createContext } from 'react';
import { CredentialsSignIn } from 'src/modules/auth/adapters/out/auth';
import { EnabledModule } from 'src/modules/patient/out/patient';

export type AuthContextData = {
  isAuthenticated: boolean;
  patient: string | null; //TODO: change name
  assignedProfessional: string;
  fullnameAndSurname: string;
  enabledModules: EnabledModule[];
  signInHandler: (credentials: CredentialsSignIn) => Promise<any>;
  signUpHandler: (credentials: CredentialsSignIn) => Promise<any>;
  signOutHandler: () => void;
};

export const AuthContext = createContext<AuthContextData>({
  isAuthenticated: false,
  patient: null, //TODO: change name
  assignedProfessional: '',
  fullnameAndSurname: '',
  enabledModules: [],
  signInHandler: async (credentials: CredentialsSignIn) => {},
  signUpHandler: async (credentials: CredentialsSignIn) => {},
  signOutHandler: () => {},
});
