import express from "express"
import isAuthenticated from "../middlewares/Auth.middleware.js"
import { applyJob, getApplicants, getAppliedJobs, updatedStatus } from "../controllers/application.controller.js"

const router = express.Router()
router.route("/apply/:id").get(isAuthenticated, applyJob)
router.route("/get").get(isAuthenticated, getAppliedJobs)
router.route("/:id/applicants").get(isAuthenticated, getApplicants)
router.route("/status/:id/update").post(isAuthenticated, updatedStatus)


export default router