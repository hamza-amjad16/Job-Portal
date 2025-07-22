import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(404).json({
        message: "Job id is required",
        success: false,
      });
    }
    // check user already applied for job
    const exsistingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (exsistingApplication) {
      return res.status(400).json({
        message: "You already applied for this Job",
        success: false,
      });
    }

    // check if the Job is exsist or not
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(400).json({
        message: " Job not found",
        success: false,
      });
    }
    // create new application
    const newapplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.applications.push(newapplication._id);
    await job.save();

    return res.status(201).json({
      message: "Job applied Successfully",
      success: true,
    });
  } catch (error) {
    console.log("Apply Job error", applyJob);
  }
};

// user apni sari jobs Dekh sakta hai jis per apply kiya hai
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({ creartedAt: -1 })
      .populate({
        path: "job",
        options: { sort: { creartedAt: -1 } },
        populate: {
          path: "componyId",
          options: { sort: { creartedAt: -1 } },
        },
      });

    if (!application) {
      return res.status(404).json({
        message: "Not Applied to any job",
        success: false,
      });
    }

    return res.status(200).json({
      application,
      success: true,
    });
  } catch (error) {
    console.log("Get applied Jobs", error);
  }
};

// recuiter dekhay ga meri jobs per kitna user na apply kiya
export const getApplicants = async (req , res) => {
    try {
        const jobId = req.params.id
        const job = await Job.findById(jobId).populate({
           path: "applications",
           options: {sort: {creartedAt: -1}},
           populate: {
            path: "applicant",
            options: {sort: {creartedAt: -1}},
           }
        })

        if(!job){
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }

        return res.status(200).json({
            job,
            success: true
        })

    } catch (error) {
        console.log("Get Applicants error" , error);
        
    }
}

export const updatedStatus = async (req , res ) => {
    try {
        const {status} = req.body
        const applicationId = req.params.id
        if(!status){
             return res.status(404).json({
                message: "Status is required",
                success: false
            })
        }

        // find the application by applicant id
        const application = await Application.findOne({_id :applicationId})

        if(!application){
              return res.status(404).json({
                message: "Application not found",
                success: false
            })
        }

        // updated Status
        application.status = status.toLowerCase()
        await application.save()

        return res.status(200).json({
            message: "Status updated Successfully",
            success: true
        })
        
    } catch (error) {
        console.log("Update Status error", error);
        
    }
}