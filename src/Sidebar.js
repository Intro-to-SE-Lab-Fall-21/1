import { Button } from "@material-ui/core";
import React from "react";
import "./Sidebar.css";
import AddIcon from "@material-ui/icons/Add";
import InboxIcon from "@material-ui/icons/Inbox";
import SidebarOption from "./SidebarOption";
import { useDispatch } from "react-redux";
import { openSendMessage } from "./features/mailSlice";

function Sidebar() {
  const dispatch = useDispatch();

  return (
    <div className="sidebar">
      <Button
        className="sidebar__sendmail"
        onClick={() => dispatch(openSendMessage())}
      >
        SendMail
      </Button>

      <SidebarOption
        Icon={InboxIcon}
        title="Mail"
        number={10}
        selected={true}
      />
    </div>
  );
}

export default Sidebar;
