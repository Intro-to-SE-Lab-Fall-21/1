import { useDispatch } from "react-redux";
import {useHistory} from "react-router-dom";
import {selectMail} from "./feature/mailSlice"
function EmailRow(id,title,subject,description,time) {
    const history = useHistory();
    const dispatch = useDispatch();
    const openMail = () => {
        dispatch(
            dispatch(selectMail({
                id,
                title,
                subject,
                description,
                time,
            }))
        )
        history.push("/mail")
    }
    return (
        <div onClick={openMail} className="">
            
        </div>
    )
}

export default EmailRow
