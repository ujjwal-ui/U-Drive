import BackDrop from "../BackDrop/BackDrop";
import classes from "./AddFolder.module.css";
import { useContext, useRef, useState } from "react";
import {Timestamp, addDoc, db } from "../../firebase";
import { collection } from "@firebase/firestore";
import {AuthContext} from "../../auth-context";
import {ROOT_FOLDER} from "../../useFolder";


const AddFolder = ({currentFolder, closeModal}) => {
    const folderRef = useRef();
    const { auth } = useContext(AuthContext);
    const [error, setError] = useState("");

    if(currentFolder == null)
        return;
        
    const path = [...currentFolder.path];
    if(currentFolder !== ROOT_FOLDER) {
        path.push({name: currentFolder.name, id: currentFolder.id});
    }


    const addFolderHandler = async () => {
        setError("");
        let folderName = folderRef.current.value;
        const time = Timestamp.now();

        if(folderName === "")
            return setError("Enter a folder name");

        try{
            const docRef = await addDoc(collection(db, 'folders'), {
                name: folderName,
                parentId: currentFolder.id,
                userId: auth.user,
                path: path,
                createdAt: time
            });

        }catch(error) {
            console.log(error.message);
            alert(error.message);
        }

        closeModal();
    }

    return (
        <BackDrop>
            <div className={classes.AddFolder}>
                <p>{error}</p>
                <input ref={folderRef} placeholder="folder name" type="text"/>
                <div>
                    <button onClick={addFolderHandler}>add</button>
                    <button onClick={closeModal}>close</button>
                </div>
            </div>
        </BackDrop>
    )
}
export default AddFolder;