const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const { checkForAuthenticationCookie } = require("./middlewares/authentication")

const app = express()
const PORT = 8000;

const userRoute = require("./routes/user")
const blogRoute = require("./routes/blog")

app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))
mongoose.connect("mongodb://localhost:27017/blogWebsite").then(()=>console.log("Mongoose connected"))

app.set('view engine', 'ejs')
app.set("views", path.resolve("./views"))

app.get("/", (req,res)=>{
    res.render("home",{
        user: req.user
    })
})

app.use("/user", userRoute)
app.use("/blog", blogRoute)

app.listen(PORT, ()=> console.log("Server started at", PORT))