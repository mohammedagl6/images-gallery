import ImageList from '@mui/material/ImageList';
import ProgressItem from './ProgressItem';
const Progress = ({ files }) => {
  return (
    <ImageList
      rowHeight={164}
      style={{
        gridTemplateColumns: 'repeat( auto-fill, minmax(164px, 1fr) )',
      }}
    >
      {files.map((file, index) => (
        <ProgressItem file={file} key={index} />
      ))}
    </ImageList>
  );
};

export default Progress;
