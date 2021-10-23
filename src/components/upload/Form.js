import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import { useRef } from 'react';

const Form = ({ setFiles }) => {
  const labelRef = useRef();
  const handleChange = (e) => {
    setFiles([...e.target.files]);
  };
  return (
    <form>
      <label htmlFor='icon-button-file' ref={labelRef}>
        <input
          accept='image/*'
          id='icon-button-file'
          type='file'
          style={{ display: 'none' }}
          multiple
          onChange={handleChange}
        />

        <Fab
          color='primary'
          aria-label='add'
          variant='normal'
          onClick={() => labelRef.current.click()}
        >
          <AddIcon fontSize='large' variant='contained' />
        </Fab>
      </label>
    </form>
  );
};

export default Form;
