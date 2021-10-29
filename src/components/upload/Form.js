import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import { useRef } from 'react';
import { useAuth } from '../../context/AuthContext';

const Form = ({ setFiles }) => {
  const fileRef = useRef();
  const { setIsOpen, currentUser } = useAuth();
  const handleChange = (e) => {
    setFiles([...e.target.files]);
    fileRef.current.value = null;
  };
  const handleClick = () => {
    if (currentUser) {
      fileRef.current.click();
    } else {
      setIsOpen(true);
    }
  };
  return (
    <form>
      <label htmlFor='icon-button-file'>
        <input
          accept='image/*'
          id='icon-button-file'
          type='file'
          style={{ display: 'none' }}
          multiple
          onChange={handleChange}
          ref={fileRef}
        />

        <Fab
          color='primary'
          aria-label='add'
          variant='normal'
          onClick={handleClick}
        >
          <AddIcon fontSize='large' variant='contained' />
        </Fab>
      </label>
    </form>
  );
};

export default Form;
