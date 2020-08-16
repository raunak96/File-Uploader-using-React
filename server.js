const express= require('express');
const fileUpload = require('express-fileupload');

const app =express();

app.use(fileUpload());

app.post('/upload',(req,res)=>{
    if(req.file.files===null)
        return res.status(400).json({error:"No file to upload!"});
    
    const file = res.files.file;
   
    file.mv(`${__dirname}/client/public/uploads/${file.name}`,err=>{         // move file to this location
        if(err){
            console.error(err);
            res.status(500).send(err);
        }
        res.json({fileName:file.name, filePath: `/uploads/${file.name}`});
    }); 
})

app.listen(5000,()=> console.log(`Server started at port 5000`));