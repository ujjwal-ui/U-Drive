import classes from "./File.module.css";
import {Link} from "react-router-dom";

const File = ({file}) => {
    let filename = file.name;

    if(filename.length > 12)
        filename = filename.slice(0, 8);

    return (
        <a className={classes.File} href={file.link}>{filename}</a>
    )
}
export default File;