import React, { useEffect, useReducer, useState } from "react";
import {onAuthStateChanged, getAuth} from "./firebase";

export const AuthContext = React.createContext();
const initialState = {user: null};

const ACTIONS = {
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_FAILED: "LOGIN_FAILED",
    LOGOUT: "LOGOUT"
}

const reducer = (state, action) => {

    switch(action.type) {
        case (ACTIONS.LOGIN_SUCCESS):
            return { user: action.payload };

        case (ACTIONS.LOGIN_FAILED):
            return { user: null };
        
        case (ACTIONS.LOGOUT):
            return { user: null };

         default:
            return state;
    }
}

export const AuthProvider = (props) => {
    const [auth, dispatch] = useReducer(reducer, initialState);
    const [loading, setLoding] = useState(true);

    // checking the currentUser state...
    useEffect(() => {
        let changeState = true;

            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
              changeState && dispatch({type: "LOGIN_SUCCESS", payload: user && user.uid});
              changeState && setLoding(false);
              changeState = false;
            });
    }, []);

    return (
            <AuthContext.Provider value={{auth, dispatch}}>
                {!loading && props.children}
            </AuthContext.Provider>
    )
}

