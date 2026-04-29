type EnabledModule = {
  name: string;
  isEnabled: boolean;
};

export type User = {
  firstname: string;
  lastname: string;
  email?: string;
  photo?: string;
  assignedModule: string;
  enabledModules: EnabledModule[];
};

export type GetUserInput = {
  user: string;
};

export type GetUserRequest = {
  input: GetUserInput;
};

export type GetUserResponse = {
  getUser: User;
};

export type PatientBody = {
  uuid: string;
  user: User;
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

export type ActivatePatientBody = {
  user: string;
  password: string;
};

export type ActivatePatientRequest = {
  input: ActivatePatientBody;
};

export type ActivatePatientResponse = {
  activatePatient: User;
};
