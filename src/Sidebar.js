import { Button } from "@material-ui/core";
import React from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import { useDispatch } from "react-redux";
import { openSendMessage } from "./features/mailSlice";
import { Send } from "@material-ui/icons";

function Sidebar() {
  const dispatch = useDispatch();

  return (
    <div className="sidebar">
      <Button
        className="sidebar__sendmail"
        onClick={() => dispatch(openSendMessage())}
      >
     
        <SidebarOption
        Icon={Send}
        title="Send Mail"
        selected={true}
        />
      </Button>

         
      
    </div>
  );
}

export default Sidebar;
