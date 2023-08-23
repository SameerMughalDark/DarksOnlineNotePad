
const express = require('express');
const router = express.Router();
const User = require('../model/User');
// using express-validator framework for validation of data
const { body, validationResult } = require('express-validator');
//using bycryptjs package for password hashing and salting 
const darksBcrypt = require('bcryptjs');
// JWT Token ka use kr raha hoo y session storage ka kaam krta hai or iss ky sath hum 1 secret signature string bhi dety hain or jb email password match krwa ky user ko login krwana hota hai to hum token bhi check krty hain agr jwt hai para to usy ander any dety hain or jb tk logout naa kry tb tk us ki user id ko token ky sath sambhal ky rkhty hain OR HAAN YAAD RKHNA hum email password match hony ky baad usy apni collection mein sy koi unique cheez token ky sath dein gy wo email bhi ho skti hai or id bhi ho skti hai QKY y cheezien unique hoti hain
const jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser');
const JWT_SECRET_SIGNATURE = "darksSecretcode_kuch_bhi_rkh_lo";

// express-validator ko use krny ky liye router.post ya router.get ky baad path ky baad coma laga ky 1 array banao or us mein sari validation likh do phr usky baad req,res waly callback function ky ander express-validator ky 2usry parameter validationResult ko pehly req sy any wala parsed data do or phr check kro ky agr us mein koi error aa raha hai to data aagy naa bhjo warna bhj do jaisy neechy mei ny kia hua hai
router.post('/createuser', [
    // agr hum error ky sath apna custom message dalna chahty hon to hum body mein pehla parameter to middleware sy ly ky any wali value ki key ka naam lkhty hain or dusra parameter mein hum apna message likh skty hain neechy 
    body("name", "Naam 3 lafzon sy Bara hona Chahiye or Khaali ni chorna").notEmpty().isLength({ min: 3 }),
    body("password", "Password ki Length 5 lafzon sy bari honi chahiye").isLength({ min: 5 }),
    body("email", "Invalid Email-Dark check  @ in your email").isEmail(),

], async (req, res) => {
    let success=false;
    const ourValidationErrors = validationResult(req);
    if (!ourValidationErrors.isEmpty()) {
        return res.status(400).json({success, errors: ourValidationErrors.array() })
    }

    //    mei req.body sy any wala data apny user model mein bhj raha hoo or agr foramt same hua mery model ky schema ka or req.boy waly data kaa to wo mery mongodb ky db mein save ho jaye ga
    try {
        //athtiyatan try catch mein wrap kr rahaa hoo taaky agr koi error aa jata hai to  usy smbhaal ly

        // method#3 to save data in database after validation (await always use with async method/function ko async kro phr await istemal kr sako gy (req,res) hamara function hai to issi ko async kr do async(req,res) y sirf tb hi krna jb method 3 use kr rahy ho)

        // or yahan findOne mongodb ky function sy pehly bhi await lagana warna wo code mein iss line mein ruky gaa ni or wo error dy dy gaa iss liye await lazmi lagana taaky wo check kry database mein
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            success=false;
            return res.status(400).json({ success,errors: "Sorry Email is Already In USE" })

        }
        //   salting and hashing process
        const salt = await darksBcrypt.genSalt(10);
        const securePassword = await darksBcrypt.hash(req.body.password, salt)
        // creating a new user
        user = await User.create({
            name: req.body.name,
            password: securePassword,
            email: req.body.email,
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authentication = jwt.sign(data, JWT_SECRET_SIGNATURE);
        success=true;
        // y success true mei ny front end developer ky liye lagaya hai taky wo easily kaam kr sky front end py isi success ko true yaa false dekh ky
        // res.json ya res.send dono mein sy 1 hi use kr skty hain hum log
        res.json({success,authentication})


        // some other logics of dark and experiences
        
        // res.send({success,userEmail,authentication});//front end ky liye iss trha use krna yahan py
        //waisy res.send front end py  error dy ga agr iss ko object ki surat mein ni bhjo gy to koshish krna iss ko as a object bhjna in brackets ky ander{}
    }
    catch (error) {
        res.status(500).send("Some Error Occured"+error);
    }
    // method#2 to save data in database after validation 
    // User.create({
    //     name:req.body.name,
    //     email:req.body.email,
    //     password:req.body.email
    // }).then(user=>{res.json(user)})
    // .catch(err=>{console.log(err)})

    // method#1 to save data in database after validation 
    // const user = User(req.body);
    // user.save();
    // console.log(req.body)
    // res.send(req.body);
})

// login endpoint
router.post('/login', [
    body("email", "Please Enter Valid E-mail").isEmail(),
    body("password", "Password shouldn't be Empty").notEmpty(),
], async (req, res) => {
      // y success true mei ny front end developer ky liye lagaya hai taky wo easily kaam kr sky front end py isi success ko true yaa false dekh ky
    let success=false
    const ourValidationErrors = validationResult(req);
    if (!ourValidationErrors.isEmpty()) {
        return res.status(400).json({ errors: ourValidationErrors.array() })
    }
    // arrray destructing use kr ky req.body sy any waly data mein sy email or password nikaal raha hoo
    const { email, password } = req.body;
    try {
        let userEmail = await User.findOne({ email });//array destructring wali email yani jo email req.body sy aa rahi hai us ko match kr raha hoo
        if (!userEmail) {
            return res.status(400).json({ error: "False Information! Please Submit correct details." })
        }
        const comparePassword = await darksBcrypt.compare(password, userEmail.password);//mtlb agr email match ho jata hai ooper wala to hum usi email waly variable sy apni collection sy or cheezine bhi utha skty hain like password yaa id yaa phr dateTime or phr hum ny req.body waly password sy us ko match kia agr match ho gaya to hum data show kr dien gy warna error show krwa dien gy
        if (!comparePassword) {
            success=false
            return res.status(400).json({ success, error: "False Information! Please Submit correct details." })

        }
        const data = {
            user: {
                id: userEmail.id
            }
        }
        const authentication = jwt.sign(data, JWT_SECRET_SIGNATURE);
        success=true;
        // y success true mei ny front end developer ky liye lagaya hai taky wo easily kaam kr sky front end py isi success ko true yaa false dekh ky
        // res.json ya res.send dono mein sy 1 hi use kr skty hain hum log
        res.json({success,authentication})


        // some other logics of dark and experiences
        
        // res.send({success,userEmail,authentication});//front end ky liye iss trha use krna yahan py
        //waisy res.send front end py  error dy ga agr iss ko object ki surat mein ni bhjo gy to koshish krna iss ko as a object bhjna in brackets ky ander{}
    } catch (error) {
        console.log(error)
        res.status(500).send("Some Internal Error Occured");
    }


})

// Route#3 Getting information of loged in user
router.post('/getuser', fetchuser,async(req, res)=>{
    let userId=req.user.id;
    try {
        const our_user= await User.findById(userId).select("-password");
        res.send(our_user);
       
    } catch (error) {
        console.log(error)
        res.status(500).send("Some Internal Error Occured");
    }
})
module.exports = router;