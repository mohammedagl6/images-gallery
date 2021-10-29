import ImageListItem from '@mui/material/ImageListItem';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import useStyles from './uploadStyles';
import { useState, useEffect } from 'react';
import uploadFile from '../../firebase/uploadFile';
import addDocument from '../../firebase/addDocument';
import CircularProgressWithLabel from './CircularProgressWithLabel';
import { useAuth } from '../../context/AuthContext';
const ProgressItem = ({ file }) => {
  const classes = useStyles();
  const [imageUrl, setImageUrl] = useState(null);
  const [progress, setProgress] = useState(0);
  const { currentUser } = useAuth();
  useEffect(() => {
    const uploadImage = async () => {
      try {
        const url = await uploadFile(file, setProgress);
        await addDocument(url, currentUser.uid);
        setImageUrl(null);
      } catch (error) {
        console.log(error);
      }
    };
    setImageUrl(URL.createObjectURL(file));
    uploadImage();
  }, [file]);

  return (
    imageUrl && (
      <ImageListItem
        className={classes.imageListItem}
        style={{ width: '190px' }}
      >
        <img
          src={imageUrl}
          srcSet={`${imageUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
          alt='gallery'
          loading='lazy'
          style={{ height: '100%' }}
        />
        <div className={classes.backDrop} />
        <div className={classes.progressContainer}>
          {progress < 100 ? (
            <CircularProgressWithLabel value={progress} />
          ) : (
            <CheckCircleOutlineIcon
              sx={{ width: 60, height: 60, color: 'lightGreen' }}
            />
          )}
        </div>
      </ImageListItem>
    )
  );
};

export default ProgressItem;
