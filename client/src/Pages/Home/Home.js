import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { SaveEdit } from "../SaveEdit/SaveEdit";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

export const Home = (props) => {
  const [file, setFile] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [allertMsg, setAllertmsg] = React.useState("");
  const { state, dispatch } = React.useContext(UserContext);

  useEffect(() => {
    if (state && state.alert === true) {
      setAllertmsg(state.message);
      setOpen(true);
      dispatch({ type: "alert", payload: false });
    }
  }, [dispatch, state]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setImgSrc(URL.createObjectURL(file));
      console.log(imgSrc);
    }
  };

  return (
    <>
      {imgSrc ? (
        <SaveEdit
          imgSrc={imgSrc}
          setAllertmsg={setAllertmsg}
          setOpen={setOpen}
          setImgSrc={setImgSrc}
          file={file}
          setFile={setFile}
        ></SaveEdit>
      ) : (
        <div className="homeContainer">
          <Box
            sx={{
              width: "100%",
              marginTop: "10%",
              height: 250,
              backgroundColor: "#ffc107",
              "&:hover": {
                backgroundColor: "#ffeb3b",
              },
            }}
          >
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{ marginTop: "5px" }}
            >
              <Typography sx={{ color: "white" }} variant="h2" component="div">
                GALLERY
              </Typography>
              <Typography
                sx={{ color: "white" }}
                variant="subtitle2"
                component="div"
              >
                The memory of life
              </Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{ marginTop: "2%" }}
            >
              <Button variant="contained" component="label">
                Upload File
                <input type="file" name="file" hidden onChange={handleChange} />
              </Button>
              <Link to="/allimage">
                <Button variant="contained">All Image</Button>
              </Link>
            </Stack>
          </Box>
        </div>
      )}
      {open && (
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {allertMsg}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};
