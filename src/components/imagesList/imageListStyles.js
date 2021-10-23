import { makeStyles } from '@mui/styles';
const useStyles = makeStyles({
  imageListItem: {
    opacity: '0.7',
    transition: 'opacity 0.3s linear',
    cursor: 'pointer',
    '&:hover': {
      opacity: '1',
    },
  },
});

export default useStyles;
