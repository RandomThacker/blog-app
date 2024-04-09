const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const { checkForAuthenticationCookie } = require("./middlewares/authentication")

const Blog = require("./models/blog")

const app = express()
const PORT = 8000;

const userRoute = require("./routes/user")
const blogRoute = require("./routes/blog")

app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))
// Static files
app.use(express.static(path.resolve("./public")))

mongoose.connect("mongodb://localhost:27017/blogWebsite").then(()=>console.log("Mongoose connected"))

app.set('view engine', 'ejs')
app.set("views", path.resolve("./views"))

app.get("/", async (req,res)=>{
    const allBlogs = await Blog.find({})
    res.render("home",{
        user: req.user,
        blogs: allBlogs,
    })
})

app.use("/user", userRoute)
app.use("/blog", blogRoute)

app.listen(PORT, ()=> console.log("Server started at", PORT))