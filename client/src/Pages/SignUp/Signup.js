import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const postData = () => {
    console.log(name, email, password);
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      setMessage("invalid email !");
      setSeverity("error");
      setOpen(true);
    } else if (password !== confirmPassword) {
      setMessage("Both password are not same !");
      setSeverity("error");
      setOpen(true);
    } else {
      fetch("http://localhost:4000/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setMessage(data.error);
            setSeverity("error");
            setOpen(true);
          } else {
            localStorage.setItem("user", JSON.stringify(data.user));
            setMessage("Data save successfully 😀");
            setSeverity("success");
            setOpen(true);
            navigate("/login");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div
      style={{
        maxWidth: "310px",
        background: "#ffeb3b",
        borderRadius: "5px",
        minHeight: "380px",
        margin: "auto",
        marginTop: "8%",
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#0000003B" }}>Sign Up</h1>
      <TextField
        sx={{ width: "100%", padding: "5px" }}
        id="outlined-basic"
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        sx={{ width: "100%", padding: "6px" }}
        id="outlined-basic"
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        sx={{ width: "100%", padding: "6px" }}
        id="filled-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        sx={{ width: "100%", padding: "6px" }}
        id="filled-password-input"
        label="Confirm Password"
        type="password"
        autoComplete="current-password"
        variant="outlined"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button
        variant="outlined"
        size="large"
        sx={{ marginLeft: "35%", padding: "6px" }}
        onClick={() => postData()}
      >
        Sign Up
      </Button>
      <Link to="/login" style={{ display: "block", textAlign: "center" }}>
        click if you have an account
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
