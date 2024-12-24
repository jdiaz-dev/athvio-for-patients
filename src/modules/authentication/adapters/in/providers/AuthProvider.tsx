import React, { ReactNode, useEffect, useState } from 'react';
import { createSessionCookies, getToken, getPatientId } from 'src/modules/authentication/adapters/out/storage';
import { AuthContext } from '../context/AuthContext';
import { CredentialsSignIn, JwtDto } from 'src/modules/authentication/adapters/out/authentication';
import { useAuthentication } from 'src/modules/authentication/adapters/out/authenticationActions';
import { usePatient } from 'src/modules/Account/in/patientActions';

function AuthProvider({ children }: { children: ReactNode }) {
  const { signIn } = useAuthentication();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [patient, setPatient] = useState('');
  const [assignedProfessional, setAssignedProfessional] = useState('');
  const [fullnameAndSurname, setFullnameAndSurname] = useState('');
  const { getPatient } = usePatient();

  useEffect(() => {
    const getPatientHelper = async () => {
      const { data } = await getPatient({ patient });
      if (data) {
        setAssignedProfessional(data.getPatientForMobile.professional);
        setFullnameAndSurname(data.getPatientForMobile.user.firstname + ' ' + data.getPatientForMobile.user.lastname);
      }
    };
    if (isAuthenticated) getPatientHelper();
  }, [isAuthenticated]);

  useEffect(() => {
    const verfifyAuthentication = async () => {
      const isAuth = await getToken();

      const patient = await getPatientId();
      setPatient(patient);
      setIsAuthenticated(isAuth == null ? false : true);
    };
    verfifyAuthentication();
  }, []);

  const saveJwt = async (data: JwtDto) => {
    await createSessionCookies({ ...data });
    setPatient(data._id);
    setIsAuthenticated(true);
  };
  const signInHandler = async (credentials: CredentialsSignIn) => {
    const { data } = await signIn(credentials);
    if (data) await saveJwt(data.signIn);
  };

  const signOut = () => {};

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        patient,
        assignedProfessional,
        fullnameAndSurname,
        signInHandler,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
