import { Backdrop, CircularProgress } from '@mui/material';
import { useAuth } from '../context/AuthContext';

export default function Loading() {
  const { loading } = useAuth();
  return (
    loading && (
      <div>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 999 }}
          open={true}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
      </div>
    )
  );
}
