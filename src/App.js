import { Container } from '@mui/material';
import ImagesList from './components/imagesList/ImagesList';
import Upload from './components/upload/Upload';
import useStyles from './styles';
const App = () => {
  const classes = useStyles();
  return (
    <Container maxWidth='lg' className={classes.container}>
      <Upload />
      <ImagesList />
    </Container>
  );
};

export default App;
