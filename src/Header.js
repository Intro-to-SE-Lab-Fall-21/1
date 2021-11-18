import React, { useEffect, useState } from "react";
import "./Header.css";
import { Avatar } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "./features/userSlice";
import { auth } from "./firebase";
import { db } from "./firebase";

function Header() {
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
          }))
        )
      );
  }, []);
  useEffect(() => {
    setFilteredContacts(
      emails.filter(
        (user) =>
          user.id.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, emails]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const signOut = () => {
    auth.signOut().then(() => {
      dispatch(logout());
    });
  };

  return (
    <div className="header">
      <div className="header__left">
       
      </div>

      <div className="header__middle">
        E-Client
      </div>
      <div className="flex">
        
      </div>
      <div className="header__right">
        <Avatar onClick={signOut} src={user?.photoUrl} />
      </div>
    </div>
  );
}

export default Header;
