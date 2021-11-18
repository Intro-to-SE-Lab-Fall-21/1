import React, { useEffect, useState } from "react";
import "./EmailList.css";
import EmailRow from "./EmailRow";
import { db } from "./firebase";
import SearchIcon from "@material-ui/icons/Search";

function EmailList() {
  
  const [emails, setEmails] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);
  useEffect(() => {
    db.collection("emails")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setEmails(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
            subject: doc.data().subject,
          }))
        )
      );
  }, []);
  useEffect(() => {
    setFilteredContacts(
      emails.filter(
        (user) =>
          user.subject.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, emails]);



  return (
    <div className="emailList">
      <div className="emailList__settings">
        <div className="emailList__settingsLeft">
        </div>
        <div className="emailList__settingsRight">
        </div>
      </div>
      <div className="ui search">
      
        <div className="ui icon input">
        <SearchIcon />
          <input placeholder="Search mail" type="text" onChange={(e) => setSearch(e.target.value)}/>
          <i className="search icon"></i>
        </div>
      </div>
      
      

      <div className="flex">
        {filteredContacts.map(({ id, data: { to, subject, message,description, timestamp,avatar } }) => (
          <EmailRow
            id={id}
            key={id}
            title={to}
            subject={subject}
            description={message}
            time={new Date(timestamp?.seconds * 1000).toUTCString()}
            avatar={avatar}
          />
        ))}
      </div>

    </div>
  );
}

export default EmailList;
