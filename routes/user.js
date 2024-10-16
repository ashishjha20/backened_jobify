
const express = require("express");
const router = express.Router();


const User = require("../models/User");
const { createUser } = require("../controllers/AddUserDetails");

const {login, signup} = require("../Controllers/Auth");
const  {createJob}  = require("../Controllers/Addjobs"); // Ensure this is correct

const {auth, isStudent,isAdmin} = require("../middlewares/auth");
const {getAllJobs} = require("../Controllers/Getjobsbycompany")
const { updateInterestedSchema } = require("../controllers/UpdateInterestedSchema");
const { getInterestedCandidates}=require("../Controllers/GetInterestedCanidate")
const {deleteJob}=require("../Controllers/DeleteJob");
const {getUserByEmail }=require("../Controllers/GetUserDetails");

router.put("/updateInterest", updateInterestedSchema);
router.get("/getdetails/:email",getUserByEmail );



// Define the route for getting jobs by email
router.get("/alljobs",getAllJobs);
// Example route in your server.js or routes file
router.get('/candidates/:companyEmail/:title', getInterestedCandidates);



router.post("/login", login);
router.post("/register", signup);
router.post("/addjobs",createJob);
router.post("/adduserdetail",createUser)
// Route to get all jobs by email


router.delete("/deleteJob/:jobId", deleteJob);


//testing protected routes for single middleware
router.get("/test", auth, (req,res) =>{
    res.json({
        success:true,
        message:'Welcome to the Protected route for TESTS',
    });
});

//Protected Route
router.get("/Searcher", auth, isStudent, (req,res) => {
    res.json({
        success:true,
        message:'Welcome to the Protected route for Students',
    });
} );

router.get("/Provider", auth, isAdmin, (req,res) => {
    res.json({
        success:true,
        message:'Welcome to the Protected route for Admin',
    });
});


// router.get("/getEmail" , auth, async (req,res) => {

//     try{
//         const id = req.user.id;
//         console.log("ID:" , id);
//         const user = await User.findById(id);

//         res.status(200).json({
//             success:true,
//             user:user,
//             message:'Welcome to the email route',
//         })
//     }
//     catch(error) {
//         res.status(500).json({
//             success:false,
//             error:error.message,
//             message:'Fatt gya code',
//         })
//     }

// });

module.exports = router;
