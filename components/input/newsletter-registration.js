import { useRef, useContext } from "react";
import classes from "./newsletter-registration.module.css";
import NotficationContext from "../../store/NotificationContext";

function NewsletterRegistration() {
  const inputRef = useRef();
  const notficationContext = useContext(NotficationContext);

  function registrationHandler(event) {
    event.preventDefault();
    const body = {
      email: inputRef.current.value,
    };

    notficationContext.showNotification({
      title: "Signing up",
      message: "Registering for newsletter",
      status: "pending",
    });

    fetch("/api/NewsLetter", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // 這邊也要用promise, 因為要等res.json這個async步驟
        // 加這個才會讓你到catch
        return res.json().then((data) => {
          throw new Error(data.message || "something went wrong");
        });
      })
      .then((data) =>
        notficationContext.showNotification({
          title: "Success",
          message: "Successfully Registered",
          status: "success",
        })
      )
      .catch((error) =>
        notficationContext.showNotification({
          title: "Error",
          message: error.message || "something went wrong",
          status: "error",
        })
      );
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={inputRef}
          />
          <button onClick={registrationHandler}>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
