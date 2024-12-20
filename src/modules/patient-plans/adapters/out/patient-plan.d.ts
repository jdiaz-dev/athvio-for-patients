export type GetRecordsBody = {
  offset: number;
  limit: number;
  search?: string[];
};

export type MetadataRecords = {
  total: number;
  offset: number;
  limit: number;
};

export type Plan = {
  _id: string;
  title?: string;
  week: number;
  day: number;
  meals: Meal[];
};

export type PatientPlanBody = Plan & {
  patient: string;
  assignedDate: string;
  // comments
  // commentResult
};

export type GetRecordsPatientPlansBody = GetRecordsBody & {
  patient: string;
};

export type GetPatientPlansRequest = {
  patientPlans: GetRecordsPatientPlansBody;
};

export type PatientPlans = {
  data: PatientPlanBody[];
  meta: MetadataRecords;
};

export type GetPatientPlansResponse = {
  getPatientPlansForMobile: PatientPlanBody[];
};

export interface PatientPlanInitialState {
  patientPlans: { data: PatientPlanBody[]; error: string | null };
}
