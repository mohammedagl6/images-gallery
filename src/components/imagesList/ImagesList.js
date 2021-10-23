import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import useFirestore from '../../firebase/useFirestore';
import useStyles from './imageListStyles';
import SimpleReactLightbox from 'simple-react-lightbox';
import { SRLWrapper } from 'simple-react-lightbox';

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const ImagesList = () => {
  const { documents: images } = useFirestore();

  const classes = useStyles();
  return (
    <SimpleReactLightbox>
      <SRLWrapper>
        <ImageList variant='quilted' cols={4} rowHeight={200}>
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
              <img
                {...srcset(
                  item?.data?.imageUrl,
                  121,
                  pattern[
                    index - Math.floor(index / pattern.length) * pattern.length
                  ].cols,
                  pattern[
                    index - Math.floor(index / pattern.length) * pattern.length
                  ].rows,
                )}
                alt='Gallery'
                loading='lazy'
              />
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
