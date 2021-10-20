import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import { Button } from "@material-ui/core"
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import { closeSendMessage } from "./features/MailSlice";
import { db } from "./firebase";
import firebase from "firebase";
function SendMail(){
    const {register,handleSubmit,watch,errors} = useForm();
    const dispatch = useDispatch();
    const onSubmit = (formdata) => {
        console.log(formdata);
        db.collection("emails").add({
            to: formdata.to,
            subject: formdata.subject,
            message: formdata.message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        dispatch(closeSendMessage());
    };


    return(
        <div className="absolute bottom-0 right-52 bg-gray-500 w-2/5 h-2/5 max-w-500 border-t-10 flex flex-col border-2">
            <div className="p-12 flex justify-between align-middle bg-gray-600">
                <h3>New Message</h3>
                <CloseIcon onClick={() => dispatch(closeSendMessage())} className="cursor-pointer" />

            </div>
            <div className="flex flex-1 flex-col">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="h-30 p-10 border-b-2 outline-none">
                    <input name="to" placeholder="To" type="email" ref={register({required: true})} />
                    {errors.to && <p className="bg-white text-red-600 text-right p-2">Need a To</p>}
                    <input name="subject" placeholder="Subject" type="Subject" ref={register({required: true})}/>
                    {errors.to && <p className="bg-white text-red-600 text-right p-2">Need a Subject</p>}
                    <div className="flex-1">
                    <input name="message" placeholder="Message" type="text" ref={register({required: true})}/>
                    {errors.to && <p className="bg-white text-red-600 text-right p-2">Need a Message</p>}
                    </div>
                </div>
                <div className="">
                    <Button className="bg-blue-600 capitalize m-14">Send</Button>
                </div>
            </form>
            </div>

    </div>
    )
}

export default SendMail;