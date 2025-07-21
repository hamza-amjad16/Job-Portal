import { Job } from "../models/job.model.js"

export const postJob = async (req , res) => {
    try {
        const {title , description , requirements, salary, location, jobType, 
            experience, position, componyId } = req.body
            

        const userId = req.id

        if(!title || !description || !requirements || !salary || !location || !jobType 
           || !experience || !position ||!componyId){
            return res.status(400).json({
                message: "Something is missing",
                success: false
            })}

    const job = await Job.create({
        title,
        description,
        requirements: requirements.split(","),
        salary: Number(salary),
        location,
        jobType,
        experience,
        position,
        componyId,
        created_by: userId
    })

    return res.status(201).json({
        message: "New job created successfully",
        job,
        success: true
    })

    } catch (error) {
        console.log("Post job error", error);
    }
}

export const getAllJobs = async( req , res) => {
    try {
        const keyword = req.query.keyword || ""
        const query = {
            $or:[
                {title: {$regex:keyword, $options:"i"}},
                {description: {$regex:keyword, $options:"i"}}
            ]
        }

        const jobs = await Job.find(query).populate({
            path:"componyId"
        }).sort({createdAt: -1})

        if(!jobs){
            return res.status(404).json({
                message: "Jobs not Found",
                success: false
            })
        }

        return res.status(200).json({
            jobs,
            success: true,
        })

    } catch (error) {
        console.log("Get All Job error" , error);
        
    }
}

export const getJobById = async(req , res) => {
    try {
        const JobId = req.params.id
        const job = await Job.findById(JobId).populate({
            path: "applications"
        })
        if(!job){
            return res.status(404).json({
                message: "Jobs not Found",
                success: false
            })
        }

         return res.status(200).json({
            job,
            success: true,
        })

    } catch (error) {
        console.log("Get job by Id error",error);
        
    }
}

// recruiter ke Jobs 
export const getRecruiterJob = async(req , res) => {
    try {
        const recruiterId = req.id
        const jobs = await Job.find({created_by: recruiterId}).populate({
            path: "componyId",
            createdAt: -1
        })

         if(!jobs){
            return res.status(404).json({
                message: "Jobs not Found",
                success: false
            })
        }

         return res.status(200).json({
            jobs,
            success: true,
        })
    } catch (error) {
        console.log("GET recruiter job",error);
    }
}