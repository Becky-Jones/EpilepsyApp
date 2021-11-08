import { Document } from "mongoose"

export interface IUser extends Document {
    first_name: string,
    surname: string,
    date_of_birth: string,
    gender: string,
    email: string,
    password: string,
    address1: string,
    address2: string,
    postcode: string,
    user_type: string,
    patient_details?: IPatientDetails
}

export interface IPatientDetails extends Document {
    seizure_type: [string],
    years_suffered: number,
    seizure_triggers: [string],
    seizure_monthly_frequency: number,
    mental_health_issues: [string]
}