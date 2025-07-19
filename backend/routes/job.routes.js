import express from "express"
import isAuthenticated from "../middlewares/Auth.middleware.js"
import { getAllJobs, getJobById, getRecruiterJob, postJob } from "../controllers/job.controller.js"


const router = express.Router()

router.route("/post").post(isAuthenticated,postJob)
router.route("/getAll").get(isAuthenticated,getAllJobs)
router.route("/get/:id").get(isAuthenticated,getJobById)
router.route("/getAdminjobs/:id").get(isAuthenticated,getRecruiterJob)

export default router

