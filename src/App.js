import { Container } from '@mui/material';
import ImagesList from './components/imagesList/ImagesList';
import Nav from './components/Nav';
import Upload from './components/upload/Upload';
import Login from './components/user/Login';
import AuthContext from './context/AuthContext';
import useStyles from './styles';
const App = () => {
  const classes = useStyles();
  return (
    <Container maxWidth='lg' className={classes.container}>
      <AuthContext>
        <Nav />
        <Login />
        <Upload />
        <ImagesList />
      </AuthContext>
    </Container>
  );
};

export default App;
