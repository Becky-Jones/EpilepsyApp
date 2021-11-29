import { Response, Request } from "express"
import { IMovie } from "./../../types/movie"
import Movie from "../../models/movie"

const getMovies = async (req: Request, res: Response): Promise<void> => {
  try {
    const movies: IMovie[] = await Movie.find()
    res.status(200).json({ movies })
  } catch (error) {
    throw error
  }
}

const addMovie = async (req: Request, res: Response): Promise<void> => {
    
    try {
      const body = req.body as Pick<IMovie, "title" | "length" | "warnings">
      console.log("PRINTING REQUEST body.warnings: " + JSON.stringify(body.warnings))

      const movie: IMovie = new Movie({
        title: body.title,
        length: body.length,
        warnings: body.warnings,
      })
  
      const newMovie: IMovie = await movie.save()
      const allMovies: IMovie[] = await Movie.find()
  
      res
        .status(201)
        .json({ message: "Movie added", movie: newMovie, movies: allMovies })
    } catch (error) {
      throw error
    }
}

const updateMovie = async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        params: { id },
        body,
      } = req
      const updateMovie: IMovie | null = await Movie.findByIdAndUpdate(
        { _id: id },
        body
      )
      const allMovies: IMovie[] = await Movie.find()
      res.status(200).json({
        message: "Movie updated",
        movie: updateMovie,
        movies: allMovies,
      })
    } catch (error) {
      throw error
    }
}

const deleteMovie = async (req: Request, res: Response): Promise<void> => { 
  try {
      const {
        params: { id },
        body,
      } = req
      const deletedMovie: IMovie | null = await Movie.findByIdAndRemove(
        { _id: id },
        body
      ) 
      const allMovies: IMovie[] = await Movie.find()
      res.status(200).json({
        message: "Movie deleted",
        movie: deletedMovie,
        movies: allMovies,
      })
    } catch (error) {
      throw error
    }
  }
  
export { getMovies, addMovie, updateMovie, deleteMovie }