require("dotenv").config();
const app = require("./app");
const connectDB  = require("./config/db");
const PORT = process.env.PORT

connectDB()
.then(() => {
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    })
})
.catch((error) => {
    console.log("MongoDB Connection Failed", error.message);
});

