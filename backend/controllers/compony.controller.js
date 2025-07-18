import {Compony} from "../models/compony.model.js"

export const registerCompony = async (req , res ) => {
    try {
        const { name: componyName} = req.body
        if(!componyName){
            return res.status(400).json({
                message: "Compony name is required",
                success: false
            })
        }

        let compony = await Compony.findOne({name:componyName})
        if(compony){
            return res.status(400).json({
                message: "You cant register same compony",
                success: false
            })
        }

        compony = await Compony.create({
            name: componyName,
            userId: req.id
        })
        
        return res.status(201).json({
            message: "Compony Registerd Successfully",
            compony,
            success: true
        })
    } catch (error) {
        console.log("Register compony error", error);
        
    }
}

export const getCompony = async (req , res) => {
    try {
        const userId = req.id
        const componies = await Compony.find(userId)
        if(!componies){
            return res.status(404).json({
                message: "Componies not found",
                success: false
            })
        }

         return res.status(200).json({
            componies,
            success: true
        })

    } catch (error) {
        console.log("Get Compony error", error);
        
    }
}

export const getComponybyId = async (req , res) => {
    try {
        const componyId = req.params.id
        const compony = await Compony.findById(componyId)
         if(!compony){
            return res.status(404).json({
                message: "Compony not found",
                success: false
            })
        }

        return res.status(200).json({
            compony,
            success: true
        })

    } catch (error) {
        console.log("GetComponyByid error", error);
        
    }
}

export const UpdateCompony = async (req , res) => {
    try {
        const {name, description, website, location} = req.body
        const file = req.file

        // cloudinary

        const updateData = {name, description, website, location}

        const compony = await Compony.findByIdAndUpdate(req.params.id , updateData , {new: true})

        if(!compony){
            return res.status(404).json({
                message: "Compony not found",
                success: false
            })
        }

        return res.status(200).json({
            message: "Compony updated",
            success: true
        })
        
    } catch (error) {
        console.log("Update Compony error", error);
        
    }
}