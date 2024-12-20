import { PatientPlanBody, PatientPlanInitialState } from 'src/modules/patient-plans/adapters/out/patient-plan';

export const patientPlanInitialState: PatientPlanInitialState = {
  patientPlans: { data: [], error: null },
};
