import React from "react";
import "./Mail.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import { IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { selectOpenMail } from "./features/mailSlice";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import SidebarOption from "./SidebarOption";
import { ArrowForward, Forward, Forward5, RepeatRounded, SendSharp } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { openForward } from "./features/mailSlice";
import { useForm } from "react-hook-form";
import { db } from "./firebase";
import firebase from "firebase";


function Mail() {
  const history = useHistory();
  const selectedMail = useSelector(selectOpenMail);
  const dispatch = useDispatch();
  const [fileUrl, setFileUrl] = React.useState(null)
  const onFileChange = async (formData) =>{
    const file = formData.target.files[0]
    const storageRef = firebase.storage().ref()
    const fileRef= storageRef.child(file.name)
    await fileRef.put(file)
    setFileUrl(await fileRef.getDownloadURL())

  }
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = (formData) => {
    console.log(formData);
    db.collection("emails").add({
      to: formData.to,
      subject: formData.subject,
      message: formData.message,
      avatar: fileUrl,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });


   
  };

  return (
    <div className="mail">
      <div className="mail__tools">
        <div className="mail__toolsLeft">
          <IconButton onClick={() => history.push("/")}>
            <ArrowBackIcon />
          </IconButton>
          
        </div>
        

      </div>
      <div className="forward">
      <Button
        className="sidebar__sendmail"
        onClick={() => dispatch(openForward())}


        
      >
     
        <SidebarOption
  
        title="Forward"
        Icon={ArrowForward}
        
        />
        
        
      </Button>

         
      
    </div>
      
      <div className="mail__body">
        <div className="mail__bodyHeader">
          <h2>{selectedMail?.subject}</h2>
          <LabelImportantIcon className="mail__important" />
          <p>{selectedMail?.title}</p>
          <p className="mail__time">{selectedMail?.time}</p>
        </div>

        <div className="mail__message">
          <p>{selectedMail?.description}</p>
        </div>
        <img width="600" src={selectedMail?.avatar} />
      </div>

      
      
    </div>
    
  );
}




export default Mail;
