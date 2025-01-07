import React, { ReactNode, useEffect, useState } from 'react';
import {
  createSessionCookies,
  getToken,
  getPatientId,
  removeSessionCokkies,
} from 'src/modules/authentication/adapters/out/storage';
import { CredentialsSignIn, JwtDto } from 'src/modules/authentication/adapters/out/authentication';
import { useAuthentication } from 'src/modules/authentication/adapters/out/authenticationActions';
import { AuthContext } from 'src/modules/authentication/adapters/in/context/AuthContext';
import { usePatient } from 'src/modules/Account/out/patientActions';

function AuthProvider({ children }: { children: ReactNode }) {
  const { signIn } = useAuthentication();
  const { getPatient } = usePatient();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [patient, setPatient] = useState<string | null>(null);
  const [assignedProfessional, setAssignedProfessional] = useState('');
  const [fullnameAndSurname, setFullnameAndSurname] = useState('');

  useEffect(() => {
    const verfifyAuthentication = async () => {
      const isAuth = await getToken();
      const patient = await getPatientId();
      setPatient(patient);
      setIsAuthenticated(isAuth != null);
    };
    verfifyAuthentication();
  }, [isAuthenticated]); // Runs only once on mount

  useEffect(() => {
    const getPatientHelper = async () => {
      if (patient !== null) {
        const { data } = await getPatient({ patient });
        if (data) {
          setAssignedProfessional(data.getPatientForMobile.professional);
          setFullnameAndSurname(`${data.getPatientForMobile.user.firstname} ${data.getPatientForMobile.user.lastname}`);
        }
      }
    };

    if (isAuthenticated) getPatientHelper();
  }, [isAuthenticated]);

  const saveJwt = async (data: JwtDto) => {
    await createSessionCookies({ ...data });
    setPatient(data._id);
    setIsAuthenticated(true);
  };

  const signInHandler = async (credentials: CredentialsSignIn) => {
    const { data } = await signIn(credentials);
    if (data) await saveJwt(data.signIn);
  };

  const signOutHandler = () => {
    removeSessionCokkies();
    setIsAuthenticated(false);
    setPatient(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        patient,
        assignedProfessional,
        fullnameAndSurname,
        signInHandler,
        signOutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
