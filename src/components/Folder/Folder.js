import classes from "./Folder.module.css";
import {Link} from "react-router-dom";

const Folder = ({folder}) => {
     let len = folder.name.length;
     let folderName = "";

     if(len > 12) {
          folderName = folder.name.slice(0, 9);
          folderName += "...";    
     }

    return <div className={classes.Folder} key={folder.id}>
               <Link to= {{pathname: `/folder/${folder.id}`, state: {folder: folder} }} className={classes.link}>
                    <img src="../folder-solid.svg" alt="error"/>
                    { folderName !== "" ? folderName : folder.name }
               </Link>
            </div> 
}
export default Folder;