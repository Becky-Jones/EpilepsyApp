import { IUser } from "./../types/user"
import { model, Schema } from "mongoose"

const patientSchema: Schema = new Schema({
    seizure_type: {
        type: Array , 
        "default" : [],
    },
    years_suffered: {
        type: Number,
    },
    seizure_triggers: {
        type: Array, 
        "default" : [],
    },
    seizure_monthly_frequency: {
        type: Number,
    },
    mental_health_issues: {
        type: Array, 
        "default" : [],
    }
})

const userSchema: Schema = new Schema(
  {
    first_name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    date_of_birth: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address1: {
        type: String,
        required: true
    },
    address2: {
        type: String,
        required: true
    },
    postcode: {
        type: String,
        required: true
    },
    user_type: {
        type: String,
        required: true
    },
    patient_details: patientSchema
  },
  { timestamps: true }
)



export default model<IUser>("User", userSchema)