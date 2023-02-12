import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import "./SaveEdit.css";
import { Box, Stack, Grid } from "@mui/material";
import CropEasy from "../Crope/CropeEasy";
import { UserContext } from "../../App";

export const SaveEdit = ({
  imgSrc,
  setImgSrc,
  file,
  setFile,
  setAllertmsg,
  setOpen,
}) => {
  const [openCrop, setOpenCrop] = useState(false);
  const [CropImg, setCropImg] = useState(imgSrc);
  const [realImgFile, setRealImgFile] = useState(file);
  const { state, dispatch } = useContext(UserContext);

  const toHome = () => {
    setImgSrc(null);
  };

  const uploadImage = () => {
    let isCropped = true;
    let user = state;
    console.log(state);
    if (CropImg === imgSrc) isCropped = false;
    let data = new FormData();

    data.append("file", realImgFile); //real image data
    data.append("file", file); //crop image data
    data.append("_id", user._id); //user detail
    data.append("isCropped", isCropped);

    fetch("http://localhost:4000/upload", {
      mode: "no-cors",
      method: "post",
      body: data,
    })
      .then((response) => {
        dispatch({ type: "alert", payload: true });
        dispatch({
          type: "alertMessage",
          payload: "Image uploaded succesfully",
        });
        setImgSrc(null);
      })
      .catch((error) => {
        console.log("whats the problem in err");
      });
  };

  return (
    <>
      {" "}
      {!openCrop ? (
        <Box
          sx={{
            width: "95%",
            height: "320px",
            margin: "5% auto",
            backgroundColor: "#ffeb3b",
          }}
        >
          <Grid container rowSpacing={1} columnSpacing={1}>
            <Grid item xs={12} md={6}>
              <div className="responsiveImage">
                <img src={imgSrc} alt="loading error" loading="lazy" />
              </div>
            </Grid>
            <Grid item sm={12} md={4}>
              <Stack
                spacing={3}
                justifyContent="center"
                alignItems="flex-start"
                direction={{ xs: "row", md: "column" }}
                sx={{ marginTop: "15px" }}
              >
                <Button variant="contained" onClick={() => uploadImage()}>
                  Save
                </Button>
                <Button variant="contained" onClick={() => setOpenCrop(true)}>
                  Crop
                </Button>
                <Button variant="contained" onClick={() => toHome()}>
                  Cancel
                </Button>
              </Stack>
            </Grid>
          </Grid>
          :
        </Box>
      ) : (
        <CropEasy
          {...{ imgSrc: CropImg, setOpenCrop, setImgSrc, setFile }}
        ></CropEasy>
      )}
    </>
  );
};
