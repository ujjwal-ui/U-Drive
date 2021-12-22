import { ROOT_FOLDER } from "../../useFolder";
import classes from "./FolderBreadcrum.module.css";
import {Link} from "react-router-dom";

const FolderBreadcrums = ({currentFolder}) => {

    let path = (currentFolder === ROOT_FOLDER) ? [] : [ROOT_FOLDER];

    if(currentFolder) {
        path = [...path, ...currentFolder.path];
    }


    return <div className={classes.FolderBreadcrums}>
                {path.map( (pathObj, index) => {
                    return <span key={pathObj.id}>
                            {pathObj.id != null ? " / " : ""}
                            
                            <Link to={{pathname: pathObj.id != null ? `/folder/${pathObj.id}` : "/dashboard",
                                state : { folder: {...pathObj, path: path.slice(1, index)} }
                            }}> {pathObj.name} </Link>
                        </span>
                })}
                { currentFolder.id != null ? " / "  : ""}
                { <span className={classes.currentFolder}> { currentFolder.name }</span> }        
          </div>
}
export default FolderBreadcrums;