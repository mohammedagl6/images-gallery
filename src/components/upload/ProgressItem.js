import ImageListItem from '@mui/material/ImageListItem';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import useStyles from './uploadStyles';
import { useState, useEffect } from 'react';
import uploadFileProgress from '../../firebase/uploadFileProgress';
import addDocument from '../../firebase/addDocument';
import CircularProgressWithLabel from './CircularProgressWithLabel';
import { useAuth } from '../../context/AuthContext';
import { v4 as uuidv4 } from 'uuid';

const ProgressItem = ({ file }) => {
  const classes = useStyles();
  const [imageUrl, setImageUrl] = useState(null);
  const [progress, setProgress] = useState(0);
  const { currentUser, alert, setAlert } = useAuth();
  useEffect(() => {
    const uploadImage = async () => {
      const imageName = uuidv4() + '.' + file.name.split('.').pop();
      try {
        const url = await uploadFileProgress(
          file,
          `gallery/${currentUser.uid}`,
          imageName,
          setProgress,
        );
        const galleryDoc = {
          imageUrl: url,
          uid: currentUser.uid,
        };
        await addDocument('gallery', galleryDoc, imageName);
        setImageUrl(null);
      } catch (error) {
        setAlert({
          ...alert,
          isAlert: true,
          severity: 'error',
          message: error.message,
          timeout: 8000,
          location: 'main',
        });
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
