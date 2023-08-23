const mongoose=require('mongoose');
const mongooseURI="mongodb://localhost:27017/inotebook";

 const  connectToDB  =() =>{
    //method#1
    (async () => {
        try {
          await mongoose.connect(mongooseURI)
          console.log('connected to mongodb successfully Dark!');
        } catch (err) {
          console.log('error: ' + err)
        }
      })()
    // method#2
    // let connect=mongoose.connect(mongooseURI);
    // if(connect){
    //     console.log("Your MongoDB Connected Successfully!");
    // }
    // else{
    //     console.log("Error");

    // }

}

module.exports =connectToDB