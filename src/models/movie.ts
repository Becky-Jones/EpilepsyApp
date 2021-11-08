import { IMovie } from "./../types/movie"
import { model, Schema } from "mongoose"

const movieSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    length: {
      type: String,
      required: true,
    },

    warnings: {
      type: Array , 
      "default" : [],
      required: true
    },
  },
  { timestamps: true }
)

export default model<IMovie>("Movie", movieSchema)