import classes from "./NavBar.module.css";
import {getAuth, signOut } from "../../firebase";
import {useHistory} from "react-router-dom";

const  NavBar = () => {
    const history = useHistory();

    const signOutUser = (e) => {
        e.preventDefault();

        const auth = getAuth();
        signOut(auth)
        .then(() => {
            history.replace("/login");
        })
        .catch((error) => {
            console.log(error.message);
        });
    }

    return (
        <nav className={classes.Nav}>
            <span>U-drive</span>
            <div>
                <p onClick={signOutUser} >logout</p>
            </div>
        </nav>
    )
}
export default NavBar;
