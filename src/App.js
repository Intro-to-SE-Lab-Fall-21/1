import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Mail from "./Mail";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EmailList from "./EmailList";
import SendMail from "./SendMail";
import { useDispatch, useSelector } from "react-redux";
import { selectForwardIsOpen, selectSendMessageIsOpen } from "./features/mailSlice";
import { login, selectUser } from "./features/userSlice";
import Login from "./Login";
import { auth } from "./firebase";
import Forward from "./Forward"




function App() {
  const sendMessageIsOpen = useSelector(selectSendMessageIsOpen);
  const ForwardIsOpen = useSelector(selectForwardIsOpen);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

    
  
  

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // the user is logged in
        dispatch(
          login({
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          })
        );
      }
    });
  }, []);

  return (
    <Router>
      {!user ? (
        <Login />
      ) : (
        <div className="app">
          <Header />

          <div className="app__body">
            <Sidebar />
            <Switch>
              <Route path="/mail">
                <Mail />
              </Route>
              <Route path="/">
                <EmailList />
              </Route>
            </Switch>
          </div>

          {sendMessageIsOpen && <SendMail />}
          {ForwardIsOpen && <Forward />}
        </div>
      )}
    </Router>
  );
}

export default App;
