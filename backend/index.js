import express from 'express'
import dotenv from "dotenv"
dotenv.config()
import cookieParser from 'cookie-parser'
import cors from "cors"
import connectDB from './utils/db.js'
import userRoute from "./routes/user.routes.js"
import componyRoute from "./routes/compony.routes.js"
import jobRoute from "./routes/job.routes.js"
import applicationRoute from "./routes/application.routes.js"

const app = express()


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
}
app.use(cors(corsOptions))

const PORT = process.env.PORT || "4000"

// apis
app.use("/api/v1/user" , userRoute)
app.use("/api/v1/compony" , componyRoute)
app.use("/api/v1/job" , jobRoute)
app.use("/api/v1/application" , applicationRoute)



app.listen(PORT , () => {
    connectDB()
    console.log(`Server running at PORT ${PORT}`);
    
})