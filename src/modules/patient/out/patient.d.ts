type EnabledModule = {
  name: string;
  isEnabled: boolean;
};

export type PatientBody = {
  uuid: string;
  user: {
    firstname: string;
    lastname: string;
    email?: string;
    photo?: string;
    assignedModule: string;
    enabledModules: EnabledModule[];
  };
  professional: string;
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
