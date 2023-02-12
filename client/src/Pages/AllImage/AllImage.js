import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import DialogBox from "../../Component/DialogBox";
import { UserContext } from "../../App";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function AllImage() {
  const { state, dispatch } = React.useContext(UserContext);
  const [open, setOpen] = React.useState(false);
  const [desireImg, setDesireImg] = React.useState();
  const [imgSrc, setImgSrc] = React.useState("");
  const [isCropped, setIsCropped] = React.useState();
  const [data, setData] = React.useState("");

  React.useEffect(() => {
    if (state) {
      const { _id } = state;
      fetch("http://localhost:4000/myimage", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          setData(result);
          console.log(result);
        });
    }
  }, [state]);

  const handleClickOpen = (real, deisre, isCropped) => {
    setImgSrc(real);
    setDesireImg(deisre);
    setIsCropped(isCropped);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <ImageList
        sx={{
          width: "70%",
          height: "90vh",
          marginLeft: "15%",
          marginTop: "20px",
        }}
        variant="woven"
        cols={4}
        rowHeight={121}
      >
        {data &&
          data.map((item) => (
            <ImageListItem
              key={item.realImg}
              cols={item.cols || 1}
              rows={item.rows || 1}
              sx={{ cursor: "pointer" }}
              onClick={() =>
                handleClickOpen(item.realImg, item.desireImg, item.isCropped)
              }
            >
              <img
                {...srcset(
                  `http://localhost:4000/${item.desireImg}`,
                  121,
                  item.rows,
                  item.cols
                )}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
      </ImageList>
      {open && (
        <DialogBox
          handleClose={handleClose}
          open={open}
          imgSrc={imgSrc}
          desireImg={desireImg}
          isCropped={isCropped}
        ></DialogBox>
      )}
    </>
  );
}
