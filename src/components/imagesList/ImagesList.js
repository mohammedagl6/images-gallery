import * as React from "react";
import {
  ImageList,
  ImageListItem,
  Avatar,
  Tooltip,
  Typography,
} from "@mui/material";
import useFirestore from "../../firebase/useFirestore";
import useStyles from "./imageListStyles";
import SimpleReactLightbox from "simple-react-lightbox";
import { SRLWrapper } from "simple-react-lightbox";
import Options from "./Options";
import { useAuth } from "../../context/AuthContext";
import moment from "moment";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const ImagesList = () => {
  const { documents: images } = useFirestore("gallery");
  const classes = useStyles();
  const { currentUser } = useAuth();
  return (
    <SimpleReactLightbox>
      <SRLWrapper>
        <ImageList variant="quilted" cols={4} rowHeight={200}>
          {images.map((item, index) => (
            <ImageListItem
              key={item?.id}
              cols={
                pattern[
                  index - Math.floor(index / pattern.length) * pattern.length
                ].cols
              }
              rows={
                pattern[
                  index - Math.floor(index / pattern.length) * pattern.length
                ].rows
              }
              className={classes.imageListItem}
            >
              {item?.data?.uid === currentUser?.uid && (
                <Options imageId={item?.id} />
              )}
              <img
                {...srcset(
                  item?.data?.imageUrl,
                  121,
                  pattern[
                    index - Math.floor(index / pattern.length) * pattern.length
                  ].cols,
                  pattern[
                    index - Math.floor(index / pattern.length) * pattern.length
                  ].rows
                )}
                alt={
                  item?.userInfo?.uName || item?.userInfo?.uEmail?.split("@")[0]
                }
                loading="lazy"
              />
              <Typography
                variant="body2"
                component="span"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  color: "white",
                  background: "rgba(0,0,0,0.3)",
                  padding: "5px",
                  borderTopRightRadius: "5px",
                }}
              >
                {moment(item?.data?.timestamp?.toDate()).fromNow()}
              </Typography>
              <Tooltip
                title={
                  item?.userInfo?.uName || item?.userInfo?.uEmail?.split("@")[0]
                }
                sx={{ position: "absolute", bottom: "3px", right: "3px" }}
              >
                <Avatar
                  src={item?.userInfo?.uPhoto}
                  imgProps={{ "aria-hidden": "true" }}
                />
              </Tooltip>
            </ImageListItem>
          ))}
        </ImageList>
      </SRLWrapper>
    </SimpleReactLightbox>
  );
};

export default ImagesList;

const pattern = [
  {
    rows: 2,
    cols: 2,
  },
  {
    rows: 1,
    cols: 1,
  },
  {
    rows: 1,
    cols: 1,
  },
  {
    rows: 1,
    cols: 2,
  },
  {
    rows: 1,
    cols: 2,
  },
  {
    rows: 2,
    cols: 2,
  },
  {
    rows: 1,
    cols: 1,
  },
  {
    rows: 1,
    cols: 1,
  },
  {
    rows: 2,
    cols: 2,
  },
  {
    rows: 1,
    cols: 1,
  },
  {
    rows: 1,
    cols: 1,
  },
  {
    rows: 1,
    cols: 2,
  },
];
