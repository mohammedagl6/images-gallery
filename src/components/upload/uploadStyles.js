import { makeStyles } from '@mui/styles';
const useStyles = makeStyles({
  imageListItem: {
    position: 'relative',
  },
  backDrop: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    background: 'rgba(0,0,0,0.5)',
  },
  progressContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
});

export default useStyles;
