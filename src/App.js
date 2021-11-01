import { Container } from '@mui/material';
import ImagesList from './components/imagesList/ImagesList';
import Nav from './components/Nav';
import Upload from './components/upload/Upload';
import Modal from './components/Modal';
import AuthContext from './context/AuthContext';
import useStyles from './styles';
import Loading from './components/Loading';

const App = () => {
  const classes = useStyles();

  return (
    <Container maxWidth='lg' className={classes.container}>
      <AuthContext>
        <Nav />
        <Loading />
        <Modal />
        <Upload />
        <ImagesList />
      </AuthContext>
    </Container>
  );
};

export default App;
