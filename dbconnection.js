const mongoose=require("mongoose");

const URL="mongodb+srv://ayushsutariya04:SYeDxCPBh129IloT@cluster1.t0ayblh.mongodb.net/";

mongoose.connect(URL)
.then(
    ()=>{console.log("database connected");}
)
.catch(
    (err)=>{console.log(err);}
)
