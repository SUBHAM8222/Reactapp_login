import React, {
  useState,
  useReducer,
  useEffect,
  useContext,
  useRef,
} from "react";
import AuthContext from "../../Store/auth-context";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {
  if (action.type === "USer_input") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "input_blur") {
    return { value: state.value, isValid: state.value.includes("@") };
  }

  return { value: "", isValid: false };
};
const passwordReducer = (state, action) => {
  if (action.type === "pw_input") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "pw_check") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};
const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  //const [enteredPassword, setEnteredPassword] = useState("");
  //const [passwordIsValid, setPasswordIsValid] = useState();
  const [enteredcollege, setEntercollege] = useState("");
  const [collegeIsvalid, setcollegeIsvalid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordstate, dispatchpassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const { isValid: emailisvalid } = emailState;
  const { isValid: passwordisvalid } = passwordstate;

  const ctx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const collegeinputref= useRef();
  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        emailisvalid && passwordisvalid && enteredcollege.trim().length > 6
      );
    }, 500);
    return () => {
      clearTimeout(identifier);
      console.log("hi");
    };
  }, [emailisvalid, passwordisvalid, enteredcollege]);

  const collegeChangeHandler = (event) => {
    setEntercollege(event.target.value);
    //setFormIsValid(
    //emailState.isValid &&
    //passwordstate.isValid &&
    //event.target.value.trim().length > 6
    //);
  };
  const validatcollegehandler = () => {
    setcollegeIsvalid(enteredcollege.trim().length > 6);
  };

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USer_input", val: event.target.value });
    // setFormIsValid(
    //   event.target.value.includes("@") &&
    //     passwordstate.isValid &&
    //     enteredcollege.trim().length > 6
    // );
  };

  const validateEmailHandler = () => {
    //setEmailIsValid(emailState.isValid );
    dispatchEmail({ type: "input_blur" });
  };

  const passwordChangeHandler = (event) => {
    dispatchpassword({ type: "pw_input", val: event.target.value });
    // setFormIsValid(
    //   emailState.isValid &&
    //     event.target.value.trim().length > 6 &&
    //     enteredcollege.trim().length > 6
    // );
  };

  const validatePasswordHandler = () => {
    dispatchpassword({ type: "pw_check" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      ctx.onLogin(emailState.value, passwordstate.value);
    } else if (!emailisvalid) {
      emailInputRef.current.focus();
    } else if(!passwordisvalid)
    {
      passwordInputRef.current.focus();
    }else
    {
      collegeinputref.current.focus();
    }

  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id="email"
          label="E-mail"
          type="email"
          isValid={emailisvalid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          id="password"
          label="password"
          type="password"
          isValid={passwordisvalid}
          value={passwordstate.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div
          className={`${classes.control} ${
            collegeIsvalid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="college">COLLEGE</label>
          <input
          ref={collegeinputref}
            type="text"
            id="college"
            value={enteredcollege}
            onChange={collegeChangeHandler}
            onBlur={validatcollegehandler}
          ></input>
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
