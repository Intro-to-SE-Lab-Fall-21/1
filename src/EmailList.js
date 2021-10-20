import { Checkbox, IconButton } from '@material-ui/core';
import { ArrowDropDown, ChevronLeft, ChevronRight, Inbox, KeyboardHide, LocalOffer, MoreVertOutlined, People, Redo, Settings } from '@material-ui/icons';
import React,{useEffect,useState} from 'react';
import Section from "./Section"
import EmailRow from "./EmailRow.js"
import {db} from "./firebase";
function EmailList() {
    const[emails,setEmails] = useState([]);

    useEffect(() => {
        db.collection('emails').orderBy('timestamp', 'desc').onSnapShot(snapshot => setEmails(snapshot.docs.map((doc) =>({
            id: doc.id,
            data: doc.data(),

        }))))
    }, []);
    return (
        <div className="">
            <div className="">
                <div className="">
                    <Checkbox />
                    <IconButton>
                        <ArrowDropDown/>
                    </IconButton>
                    <IconButton>
                        <Redo />
                    </IconButton>
                    <IconButton>
                        <MoreVertOutlined/>
                    </IconButton>
                </div>
            </div>
            <div className="">
                <IconButton>
                    <ChevronLeft/>
                </IconButton>
                <IconButton>
                    <ChevronRight/>
                </IconButton>
                <IconButton>
                    <KeyboardHide />
                </IconButton>
                <IconButton>
                    <Settings/>
                </IconButton>

            </div>
            <div className="">
                <Section Icon={Inbox} title="Primary" selected/>
                <Section Icon={People} title="Social" />
                <Section Icon={LocalOffer} title="Promotions" />
            </div>
            <div className="">
                {emails.map(({id, data: {to,subject,message,timestamp} }) => (
                    <EmailRow
                        id={id}
                        key={id}
                        title={to}
                        subject={subject}
                        description={message}
                        time={new Date(timestamp?.seconds * 10000).toUTCString()}
                    />
                ))}

            </div>
        </div>
    )
}

export default EmailList;
