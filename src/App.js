import React from 'react';
import EmailList from "./EmailList"
import SendMail  from './SendMail';
import Header from "./Header";
import SideBar from "./Sidebar";
import Mail from "./Mail";
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import {useSelector} from "react-redux";
import { selectSendMessageIsOpen } from './features/MailSlice';

function App() {
  const sendMessageIsOpen = useSelector(selectSendMessageIsOpen);
  return (
    <Router>
      <div className="">
        <Header />
        <div className="">
          <SideBar />
          
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
      </div>
    </Router>
  );
}

export default App;
