import express from "express"
import isAuthenticated from "../middlewares/Auth.middleware.js"
import { getCompony, getComponybyId, registerCompony, UpdateCompony } from "../controllers/compony.controller.js"
import { singleUpload } from "../middlewares/multer.js"

const router = express.Router()

router.route("/register").post(isAuthenticated,registerCompony)
router.route("/get").get(isAuthenticated,getCompony)
router.route("/get/:id").get(isAuthenticated,getComponybyId)
router.route("/update/:id").put(isAuthenticated, singleUpload ,UpdateCompony)

export default router