import { Response, Request } from "express"
import { IPatientDetails, IUser } from "./../../types/user"
import User from "../../models/user"

const getPatients = async (req: Request, res: Response): Promise<void> => {
    try {
        const patients: IUser[] = await User.find({ user_type: "Patient"})
        res.status(200).json({ patients })
    } catch (error) {
        throw error
    }
}

const getMyPatients = async (req: Request, res: Response): Promise<void> => {
  try {
      const {
        params: { id },
        body,
      } = req
      const adminId = id
      const patients: IUser[] = await User.find({ user_type: "Patient" })
      const myPatients: IUser[] = []
      for (let i = 0; i < patients.length; i++) {
        if (patients[i].patient_details?.practitioner_id == adminId) {
          myPatients.push(patients[i])
        }
      }
      res.status(200).json({ myPatients })
  } catch (error) {
      throw error
  }
}

const getAdmins = async (req: Request, res: Response): Promise<void> => {
    try {
        const admins: IUser[] = await User.find({ user_type: "Admin"})
        res.status(200).json({ admins })
    } catch (error) {
        throw error
    }
}

const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<IUser, "email">
        const user: IUser[] = await User.find({ email: body.email })
        res.status(200).json({ user })
    } catch (error) {
        throw error
    }
}

const addUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const body = req.body as Pick<IUser, "first_name" | "surname" | "date_of_birth" | "gender" | "email" | "password" | "address1" | "address2" | "postcode" | "user_type" | "patient_details">
      console.log(JSON.stringify(body.patient_details, null, 2))
      const user: IUser = new User({
        first_name: body.first_name,
        surname: body.surname,
        date_of_birth: body.date_of_birth,
        gender: body.gender,
        email: body.email,
        password: body.password,
        address1: body.address1,
        address2: body.address2,
        postcode: body.postcode,
        user_type: body.user_type,
        patient_details: body.patient_details
      })
    
      const newUser: IUser = await user.save()
      const allUsers: IUser[] = await User.find()
  
      res
        .status(201)
        .json({ message: "User added", user: newUser, users: allUsers })
    } catch (error) {
      throw error
    }
}

const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        params: { id },
        body,
      } = req
      const updateUser: IUser | null = await User.findByIdAndUpdate(
        { _id: id },
        body
      )
      const allUsers: IUser[] = await User.find()
      res.status(200).json({
        message: "User updated",
        user: updateUser,
        users: allUsers,
      })
    } catch (error) {
      throw error
    }
}

const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        params: { id },
        body,
      } = req
      const deletedUser: IUser | null = await User.findByIdAndRemove(
        { _id: id },
        body
      )
      const allUsers: IUser[] = await User.find()
      res.status(200).json({
        message: "User deleted",
        user: deletedUser,
        users: allUsers,
      })
    } catch (error) {
      throw error
    }
  }
  
export { getPatients, getMyPatients, getAdmins, getUser, addUser, updateUser, deleteUser }