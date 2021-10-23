import { useState } from 'react';
import Form from './Form';
import Progress from './Progress';

const Upload = () => {
  const [files, setFiles] = useState([]);
  return (
    <div>
      <Form setFiles={setFiles} />
      <Progress files={files} />
    </div>
  );
};

export default Upload;
