import { useAppDispatch } from '../store/hooks';
import { showSnackbar, type SnackbarState } from '../store/slices/snackbar.slice';

export const useSnackbar = () => {
  const dispatch = useAppDispatch();
  
  return (message: string, severity: SnackbarState['severity'] = 'info') =>
    dispatch(showSnackbar({ message, severity }));
};
