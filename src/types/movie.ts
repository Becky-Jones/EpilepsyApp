import { Document } from "mongoose"

export interface IMovie extends Document {
  title: string
  length: string
  warnings: IWarning[]
}

export interface IWarning extends Document {
    start_time: string,
    end_time: string
}