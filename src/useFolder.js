
import { useEffect, useReducer } from "react";
import {doc, onSnapshot, getDoc, db, where, query, collection, convertDoc} from "./firebase";
import {useContext} from "react";
import {AuthContext} from "./auth-context"; 

const ACTIONS = {
    SELECT_FOLDER: "SELECT_FOLDER",
    UPDATE_FOLDER: "UPDATE_FOLDER",
    UPDATE_CHILD_FOLDERS: "UPDATE_CHILD_FOLDERS",
    UPDATE_FILES: "UPDATE_FILES"
}

export const ROOT_FOLDER = {name: "Root", id: null, path: []};

const reducer = (state, action) => {
    switch(action.type){
        case (ACTIONS.SELECT_FOLDER):
            return {
                folder: action.payload.folder,
                folderId: action.payload.folderId,
                childFolders: [],
                childFiles: []
            }
        
        case (ACTIONS.UPDATE_FOLDER):
            return {...state, folder: action.payload}

        case (ACTIONS.UPDATE_CHILD_FOLDERS):
            return {
                ...state,
                childFolders: [...action.payload.childFolders]
            }

        case (ACTIONS.UPDATE_FILES):
            return {...state, childFiles: [...action.payload.childFiles]}
        
            default: 
            return state;
    }
}

export const useFolder = (folderId = null, folder = null) => {
    const {auth} = useContext(AuthContext);



    const [state, dispatch] = useReducer(reducer, {
        folderId: folderId,
        folder: folder,
        childFolders: [],
        childFiles: []
    });

    //reset the state every time a folder is selected.
    useEffect(() => {
        dispatch({type: ACTIONS.SELECT_FOLDER, payload: {folder, folderId}})
    }, [folderId, folder]);

    // updating the state for the selected folder
    // current folder
    useEffect(() => {
        let fetchIt = true;

        if(folderId == null) {
            return dispatch({type: ACTIONS.UPDATE_FOLDER, payload: ROOT_FOLDER});
        }
        const docRef = doc(db, "folders", folderId);
        
            getDoc(docRef)
            .then(foldr => {
                if(foldr.exists()) {
                    fetchIt && dispatch({type: ACTIONS.UPDATE_FOLDER, payload: convertDoc(foldr)});
                }else{
                    console.log("no such folder found");
                }
            })
            .catch(error => {
                console.log(error);
                alert(error.message);
                dispatch({type: ACTIONS.UPDATE_FOLDER, payload: ROOT_FOLDER});
            });

        return () => fetchIt = false;
    }, [folderId]);

    // updating the childrens of the current selected folder.
    //child folders.
    useEffect(() => {
        let childFol = [];

            const collectionRef = collection(db, "folders");
            const q = query(collectionRef, where("parentId", "==", folderId), where("userId", "==", auth.user));

            const unsubscribe = onSnapshot(q, snapshot => {
                childFol = [];
                snapshot.forEach(snap => childFol.push(convertDoc(snap)));
                dispatch({type: ACTIONS.UPDATE_CHILD_FOLDERS, payload: {childFolders: childFol} });
            });
              
        return () => unsubscribe();
    }, [folderId, auth]);


    useEffect(() => {
        const collectionRef = collection(db, "files");
        const q = query(collectionRef, where("folderId", "==", folderId), where("userId", "==", auth.user));
        let files = [];

        const unsubscribe = onSnapshot(q, snapshot => {
            snapshot.forEach(snap => files.push(convertDoc(snap)));
            dispatch({type: ACTIONS.UPDATE_FILES, payload: {childFiles: files}});
        });

        return () =>  unsubscribe();
    }, [folderId, auth])

    return state;
}