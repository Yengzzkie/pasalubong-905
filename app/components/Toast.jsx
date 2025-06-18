import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function Toast({ openToast, setOpenToast }) {

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenToast(false);
  };

  return (
    <div>
      <Snackbar open={openToast} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} sx={{ bottom: '70px !important', zIndex: '999999' }}  >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Message sent successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}
