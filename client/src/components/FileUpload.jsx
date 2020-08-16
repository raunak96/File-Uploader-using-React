import React,{Fragment, useState} from 'react';
import axios from 'axios';
import Message from './Message';
import Progress from './Progress';

const FileUpload = () => {
    const [file,setFile] = useState('');
    const [fileName, setFileName] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});
    const [alertMsg , setAlertMsg] = useState({});
    const [uploadPercentage, setUploadPercentage] = useState(0);


    const handleChange = e =>{
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file',file);  // file is key for our file so in back-end we can access it using req.files.file it can be named anything
        try {
            const res = await axios.post('/upload',formData,{
                headers: {
                    'Content-Type' : 'multipart/form-data'
                },

                onUploadProgress : progressEvent => {
                    setUploadPercentage(parseInt(Math.round((progressEvent.loaded *100)/progressEvent.total)));

                    // Clear percentage
                    setTimeout(() => setUploadPercentage(0), 10000);
                }
            });
            setUploadedFile(res.data);
            setAlertMsg({type:'success',msg:'File Uploaded Successfully'});

        } catch (error) {
            setUploadPercentage(0);
            if(error.response.status === 500)
                setAlertMsg({type:'danger',msg:'Something went wrong...'});
            else
                setAlertMsg({type:'danger',msg:error.response.data.error});
        }

    }
    return (
        <Fragment>
            {Object.keys(alertMsg).length>0 && <Message alertMsg={alertMsg} setAlertMsg={setAlertMsg}/> }
            <form onSubmit={handleSubmit}>
                <div className="custom-file my-4">
                    <input type="file" className="custom-file-input" id="customFile" onChange={handleChange} />
                    <label className="custom-file-label" htmlFor="customFile">{fileName}</label>
                </div>

                {uploadPercentage!==0 && <Progress uploadPercentage={uploadPercentage} />}

                <input type="submit" value="Upload" className="btn btn-primary btn-block mt-4" />
            </form>

            {
                Object.keys(uploadedFile).length > 0 && (
                    <div className="row mt-5">
                        <div className="col-md-6 m-auto">
                            <h3 className="text-center">{uploadedFile.fileName}</h3>
                            <img src={uploadedFile.filePath} alt="file" style={{width:'100%'}} />
                        </div>
                    </div>
                    
                )

            }

        </Fragment>
    );
};

export default FileUpload;