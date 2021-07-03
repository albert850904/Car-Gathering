import Link from "next/link";
import classes from "./Button.module.css";

function Button(props) {
  // 不設定anchor tag，Link會自動幫你建立一個
  if (props.link) {
    return (
      <Link href={props.link}>
        <a className={classes.btn}>{props.children}</a>
      </Link>
    );
  }

  return (
    <button onClick={props.handleClick} className={classes.btn}>
      {props.children}
    </button>
  );
}

export default Button;
