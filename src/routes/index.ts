import { Router } from "express"
import { getMovies, addMovie, updateMovie, deleteMovie } from "../controllers/movie"
import { getPatients, getAdmins, getUser, addUser, updateUser, deleteUser } from "../controllers/user"

const router: Router = Router()

// Movies
router.get("/movies", getMovies)

router.post("/add-movie", addMovie)

router.put("/edit-movie/:id", updateMovie)

router.delete("/delete-movie/:id", deleteMovie)

// Users
router.get("/patients", getPatients)

router.get("/admins", getAdmins)

router.post("/add-user", addUser)

router.put("/edit-user/:id", updateUser)

router.delete("/delete-user/:id", deleteUser)

export default router