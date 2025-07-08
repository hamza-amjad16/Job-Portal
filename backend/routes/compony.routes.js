import express from "express"
import isAuthenticated from "../middlewares/Auth.middleware.js"
import { getCompony, getComponybyId, registerCompony, UpdateCompony } from "../controllers/compony.controller.js"

const router = express.Router()

router.route("/registercompony").post(isAuthenticated,registerCompony)
router.route("/Allcompony").post(isAuthenticated,getCompony)
router.route("/getcompony/:id").post(isAuthenticated,getComponybyId)
router.route("/updatecompony/:id").post(isAuthenticated, UpdateCompony)

export default router