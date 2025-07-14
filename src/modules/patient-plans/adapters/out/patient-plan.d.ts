import { PatientPlanTypeDates } from 'src/modules/patient-plans/adapters/out/enum';
import { GetRecordsBody, Meal, MetadataRecords } from 'src/shared/types/types';

export type Plan = {
  uuid: string;
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
  currentDate: Date;
  patientPlanTypeDate: PatientPlanTypeDates;
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
