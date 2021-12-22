import {getAuth, createUserWithEmailAndPassword } from "../../firebase";
import classes from "./Signup.module.css";
import { useRef } from "react";
import {useHistory} from "react-router-dom";

const Signup = () => {
    const authentication = getAuth();
    const inputEmail = useRef();
    const inputPassword = useRef();

    const history = useHistory();

    const signupHandler = () => {
        const email = inputEmail.current.value;
        const password = inputPassword.current.value;

        if(email.trim() === "" || password.trim() === "") {
            return alert("Field is empty");
        }

        createUserWithEmailAndPassword(authentication, email, password)
        .then(res => {
            if(res.user) {
                history.replace("/login");
            } 
        })
        .catch(error => {
            console.log(error.message);
        });
    }


    return (
        <>
            <div className={classes.Signup}>
                <div className={classes.SignupContent}>
                    <input ref={inputEmail} placeholder="Email" type="text"/>
                    <input ref={inputPassword} placeholder="Password" type="password"/>
                    <button onClick={signupHandler}>Signup</button>
                  </div>
            </div>
        </>
    )
}
export default Signup;