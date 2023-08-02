const express = require("express");
const bodyParser = require("body-parser");
const studentform = require("./schema");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("./dbconnection.js");


///hsgjhscjhabj
const app = express();
const portt = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/home.html");
})


app.post("/", (req, res) => {
    res.sendFile(__dirname + "/teacher1.html");
})
app.get("/teacher1", (req, res) => {
    res.sendFile(__dirname + "/teacher1.html");
})

app.post("/teacher1", (req, res) => {
    res.sendFile(__dirname + "/registration.html");
})


app.get("/data", (req, res) => {
    res.sendFile(__dirname + "/login.html");
})

app.post("/data", async (req, res) => {
    res.sendFile(__dirname + "/login.html");

})
app.post("/logged", async (req, res, next) => {
    const studname = req.body.username;
    const studpass = req.body.psw;

    try {
        //Creating jwt token
        const token = await jwt.sign({ userId: studname }, "secretkeyappearshere", { expiresIn: "1h" });
        // console.log(token);
        res.cookie("access_token", token, { httpOnly: true, });

    } catch (err) {
        console.log(err);
        const error = new Error("Error! Something went wrong.");
        return next(error);
    }

    const verifyname = await studentform.find({ username: studname });
    if (verifyname === undefined) throw new Error("ENTERED PASSWORD OR EMAIL IS WRONG");
    else res.redirect("/dashboard");
})

var loggeddata;
app.get("/dashboard", async (req, res) => {
    
    const tokenn = req.cookies.access_token;
    
    await jwt.verify(tokenn, 'secretkeyappearshere', async function (err, decode) {
        
        const loggeduser = decode.userId;
        loggeddata = await studentform.find({ username: loggeduser });
        
    });
    
    res.sendFile(__dirname + "/dashboard.html");

});


app.post("/dashstudata", async (req, res) => {
    res.status(200).send(loggeddata);

});

// app.get("/alldata",async(req,res)=>{
//     const userdata= await studentform.find({});
//     console.log("hello");
//     res.send(userdata)
// })

app.post("/alldata", async (req, res) => {
    const userdata = await studentform.find({});
    console.log("hello");
    res.status(200).send(userdata);
})

app.post("/enterdata", async (req, res) => {
    try {
        stname = req.body.username;
        stemail = req.body.email;
        stpass = req.body.psw;
        stphone = req.body.phone;
        stbirthdate = req.body.birthday;
        stgender = req.body.gender;

        stbirthdate.toString('yyyy-MM-dd');


        // var date = new Date(stbirthdate);    used for seperate date in day month and year
        // var d = date.getFullYear();

        // console.log(d,stgender);


        const data = new studentform({
            username: stname,
            email: stemail,
            password: stpass,
            phone: stphone,
            date: stbirthdate,
            gender: stgender,
        }
        )
        await studentform.insertMany([data]);
        res.redirect("/teacher1");

    } catch (error) {
        console.log(error);
    }


})


var alldatafromdb
app.get("/attendencepage",async (req,res)=>{
    
    alldatafromdb= await studentform.find({}); 
    res.sendFile(__dirname+"/attendencepage.html");
}),
app.get("/sendatattendence",async(req,res)=>{
    res.send(alldatafromdb);
})


app.post("/atdclicked",(req,res)=>{
    res.redirect("/attendencepage");
}),






app.listen(portt, () => {
    console.log("server started");
})



