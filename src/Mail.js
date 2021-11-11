import React from "react";
import "./Mail.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import { IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { selectOpenMail } from "./features/mailSlice";
import { useSelector } from "react-redux";

function Mail() {
  const history = useHistory();
  const selectedMail = useSelector(selectOpenMail);

  return (
    <div className="mail">
      <div className="mail__tools">
        <div className="mail__toolsLeft">
          <IconButton onClick={() => history.push("/")}>
            <ArrowBackIcon />
          </IconButton>
        </div>

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
