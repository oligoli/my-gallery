import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

export default function Login() {
  const { state, dispatch } = useContext(UserContext);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const postData = () => {
    console.log("print something...");
    console.log(email, password);
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      setMessage("invalid email !");
      setSeverity("error");
      setOpen(true);
    }

    fetch("http://localhost:4000/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          setMessage(data.error);
          setSeverity("error");
          setOpen(true);
        } else {
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "user", payload: data.user });
          dispatch({ type: "alert", payload: true });
          dispatch({ type: "alertMessage", payload: "Login succesfully" });
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div
      style={{
        maxWidth: "310px",
        background: "#ffeb3b",
        borderRadius: "5px",
        height: "250px",
        margin: "auto",
        marginTop: "10%",
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Login</h1>

      <TextField
        sx={{ width: "100%", padding: "5px" }}
        id="outlined-basic"
        label="email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        sx={{ width: "100%", padding: "5px" }}
        id="outlined-basic"
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        variant="outlined"
        sx={{ marginLeft: "35%" }}
        onClick={() => postData()}
      >
        Login
      </Button>

      <Link to="/signup" style={{ textAlign: "center", display: "block" }}>
        create new account
      </Link>
      {open && (
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}
