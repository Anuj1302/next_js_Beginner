import mongoose  from "mongoose";

export default async function connect() {
  
        try{
            mongoose.connect(process.env.MONGO_URL!);
            
            const connection = mongoose.connection;
            connection.on("connected", ()=>{
                console.log("Database Connected Successfully")
            })
            connection.on("error", (err)=>{
                console.log("Error will connecting to Database" + err)
                process.exit();
            })
        }catch(error){
            console.log(error);
        }
    
}