import classes from "./Login.module.css";
import {useContext, useRef, useState} from "react";
import {getAuth, signInWithEmailAndPassword } from "../../firebase";
import {AuthContext} from "../../auth-context";
import { useHistory } from "react-router-dom";

const Login = () => {
    const inputEmail = useRef();
    const inputPassword = useRef();
    const [error, setError] = useState();
    const { dispatch } = useContext(AuthContext);
    const history = useHistory();


    const loginHandler = () => {
        const email = inputEmail.current.value;
        const password = inputPassword.current.value;
        const authentication = getAuth();
        // setError(null);

        if(email === "" || password === "")
            return alert("Field is empty");

        signInWithEmailAndPassword(authentication, email, password)
        .then(res => {
            if(res.user) {
                dispatch({type: "LOGIN_SUCCESS", payload: res.user.uid});
                history.push("/dashboard");
                return;
            }
            history.replace("/login");
        })
        .catch(error => {
            console.log(error.message);
            setError(error.message);
        });
    }

    return (
        <div className={classes.Login}>
            <div className={classes.LoginContent}>
                { error && <p className={classes.Error}>{error}</p> } 
                <input ref={inputEmail} type="text" placeholder="Email"/>
                <input ref={inputPassword} type="password" placeholder="Password"/>
                <button onClick={loginHandler}>Login</button>
            </div>
        </div>
    );

}
export default Login;