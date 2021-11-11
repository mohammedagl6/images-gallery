import { Container } from '@mui/material';
import ImagesList from './components/imagesList/ImagesList';
import Nav from './components/Nav';
import Upload from './components/upload/Upload';
import Modal from './components/modal/Modal';
import AuthContext from './context/AuthContext';
import useStyles from './styles';
import Loading from './components/Loading';
import Verification from './components/user/varification/Verification';

const App = () => {
  const classes = useStyles();

  return (
    <Container maxWidth='lg' className={classes.container}>
      <AuthContext>
        <Verification />
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
