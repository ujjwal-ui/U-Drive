import classes from "./DashBoard.module.css";
import NavBar from "../NavBar/NavBar";
import {AuthContext} from "../../auth-context";
import {useContext, useState} from "react";
import AddFolder from "../AddFolder/AddFolder";
import { useFolder } from "../../useFolder";
import Folder from "../Folder/Folder";
import {useHistory, useParams, useLocation,Redirect } from "react-router-dom";
import FolderBreadcrums from "../FolderBreadcrums/FolderBreadcrums";
import AddFile from "../AddFile/AddFile";
import File from "../File/File";



const DashBoard = () => {
    const [modal, setmodal] = useState(false);
    const [fileModal, setFileModal] = useState(false);
    const { auth } = useContext(AuthContext);
    const history = useHistory();
    
    if(!auth.user)
        history.replace("/login");

    const { folderId } = useParams();
    const {state = {}} = useLocation();
    const {folder, childFolders, childFiles } = useFolder(folderId, state.folder);
  

    const openFolderModalHandler = () => {
        setmodal(true);
    }
    const closeFolderModalHandler = () => {
        setmodal(false);
    }

    const openFileModalHandler = () => {
        setFileModal(true);
    }

    const closeFileModalHandler = () => {
        setFileModal(false);
    }


    return (
        <>
            <div className={classes.DashBoard}>
                { modal && <AddFolder currentFolder={folder} closeModal={closeFolderModalHandler}/> }
                { fileModal && <AddFile currentFolder={folder} closeModal={closeFileModalHandler} /> }
                <NavBar />
                <div className={classes.folderButtonsContainer}>
                    <button onClick={openFolderModalHandler}><img src="./folder-plus-solid.svg" alt="error"/></button>
                    <button onClick={openFileModalHandler}><img src="./file-upload-solid.svg" alt="error"/></button>
                </div>

                <div className={classes.folderArea}>
                   { folder &&  <FolderBreadcrums currentFolder={folder} /> }
                    
                    <div className={classes.ChildFolders}>
                        { childFolders.length > 0 && childFolders.map(child => {
                            return <Folder key={child.id} folder={child}></Folder>
                        }) }
                        {
                            childFiles.length > 0 && childFiles.map(file => {
                                return <File key={file.id} file={file} />
                            })
                        }
                    </div>

                </div>

            </div>
        </>
    )
}
export default DashBoard;