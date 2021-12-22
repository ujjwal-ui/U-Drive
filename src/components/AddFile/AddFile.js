import classes from "./AddFile.module.css";
import BackDrop from "../BackDrop/BackDrop";
import {useState, useContext} from "react";
import {getDownloadURL, getStorage, ref, addDoc, db, collection, Timestamp, uploadBytesResumable} from "../../firebase";
import {ROOT_FOLDER} from "../../useFolder";
import {AuthContext} from "../../auth-context";


const AddFile = ({closeModal, currentFolder}) => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const {auth} = useContext(AuthContext);

    const fileUploadHandler = async () => {
        setMessage("");

        if(file == null)
           return setMessage("file is not selected");

        const time = Timestamp.now();

        const filename = file.name;
        let path = `files/${auth.user}`;

        if(currentFolder.path.length > 0) {
            path = path+ `/${currentFolder.path.map(p => p.name).join("/")}/${currentFolder.name}`;
        }else{
            path = path + (currentFolder === ROOT_FOLDER ? `/${filename}` : `/${currentFolder.name}/${filename}`);
        }
        

        const storage = getStorage();
        const storageRef = ref(storage, path);

        const uploadTask = uploadBytesResumable(storageRef, file)
        
        uploadTask.on("state_changed", 
            (snapshot) => {

            },
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                .then(async downloadUrl => {
                    await addDoc(collection(db, "files"), {
                        name: filename,
                        createdAt: time,    
                        userId: auth.user,
                        link: downloadUrl,
                        folderId: currentFolder.id
                    });
                })
                .catch(error => {
                    console.log(error);
                });
            }
        )
    }

    const inputChangeHandler = (e) => {
        const file = e.target.files[0];
        setFile(file);
    }

    return (
        <BackDrop>
            <div className={classes.addFile}>
            {message && <p className={classes.Message}>{message}</p> }
                <p className={classes.Filename}> {file && file.name}</p>
                <label>
                    select here
                    <input onChange={(e) => inputChangeHandler(e)} type="file"></input>
                </label>
                <div>
                    <button onClick={fileUploadHandler}>upload</button>
                    <button onClick={closeModal}>close</button>
                </div>    
            </div>
        </BackDrop>

    )
}
export default AddFile;