import React, { useEffect, useState } from "react";
import "./Header.css";
import MenuIcon from "@material-ui/icons/Menu";
import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "./features/userSlice";
import { auth } from "./firebase";
import { db } from "./firebase";
import EmailRow from "./EmailRow";

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
        <IconButton>
          <MenuIcon />
        </IconButton>
      </div>

      <div className="header__middle">
        <SearchIcon />
        <input placeholder="Search mail" type="text" onChange={(e) => setSearch(e.target.value)}/>
        <ArrowDropDownIcon className="header__inputCaret" />
      </div>
      <div className="">
        {filteredContacts.map(({ id, data: { to, subject, message, timestamp } }) => (
          <EmailRow
            id={id}
            key={id}
            title={to}
            subject={subject}
            description={message}
            time={new Date(timestamp?.seconds * 1000).toUTCString()}
          />
        ))}
      </div>
      <div className="header__right">
        <Avatar onClick={signOut} src={user?.photoUrl} />
      </div>
    </div>
  );
}

export default Header;
