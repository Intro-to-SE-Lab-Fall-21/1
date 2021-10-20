import React from "react";
import MenuIcon from '@material-ui/icons/Menu';
import {IconButton} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ArrowDownDropIcon from "@material-ui/icons/ArrowDownDropIcon";
function Header(){
    return(
        <div className="flex align-middle justify-between border-b-2 bg-gray-500">

            <div className="">
            <IconButton>
                <MenuIcon />
            </IconButton>
            <img src="http://i.pinimg.com/originals/ae/47/fa/ae47fa9a8fd263aa364018517020552d.png" alt="" />
            </div>
            <div className ="">
                <SearchIcon />
                <input placeholder="Search" type="text" />
                <ArrowDownDropIcon className="header_inputCaret" />


            </div>
            <div className="">

            </div>
        </div>
    );
}

export default Header;