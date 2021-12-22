import classes from "./BackDrop.module.css";

const BackDrop = (props) => {
    return <div className={classes.BackDrop}>{props.children}</div>
}
export default BackDrop;