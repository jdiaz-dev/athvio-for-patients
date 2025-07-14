export type PatientBody = {
  uuid: string;
  user: {
    firstname: string;
    lastname: string;
    email?: string;
    photo?: string;
  };
  professional:string
};

export type GetPatientInput = {
  patient: string;
};

export type GetPatientResponse = {
  getPatientForMobile: PatientBody;
};

export type GetPatientRequest = {
  input: GetPatientInput;
};
