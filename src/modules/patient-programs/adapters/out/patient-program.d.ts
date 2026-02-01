import { GetRecordsBody, Meal, MetadataRecords } from 'src/shared/types/types';

export type GetPatientProgramsBody = GetRecordsBody & {
  professional: string;
};

export type GetPatientProgramsRequest = {
  input: GetPatientProgramsBody;
};

type Plan = {
  title: string;
  week: number;
  day: number;
  meals: Meal[];
};

export type PatientProgram = {
  professional: string;
  name: string;
  description: string;
  plans: Plan[];
};

export type PatientPrograms = {
  data: PatientProgram[];
  meta: MetadataRecords;
};

export type GetPatientProgramsResponse = {
  getMasterPrograms: PatientPrograms;
};

export type PatientProgramsInitialState = {
  patientPrograms: { data: PatientProgram[]; error: string | null };
};
