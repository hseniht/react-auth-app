import { useEffect } from "react";
import { useFetcher } from "react-router-dom";
import classes from "./NewsletterSignup.module.css";

function NewsletterSignup() {
  //fetcher is used whenever we want trigger action (or loader) without navigating to its page
  // good for behind the scene request
  const fetcher = useFetcher();
  const { data, state } = fetcher;

  useEffect(() => {
    if (state === "idle" && data && data.message) {
      // window.alert('Signup successful!')
      window.alert(data.message);
    }
  }, [data, state]);

  return(
    <fetcher.Form
      method="post"
      action="/newsletter"
      className={classes.newsletter}
    >
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
