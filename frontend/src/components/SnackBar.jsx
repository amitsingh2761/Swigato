import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
export default function SnackBar({ openCred, msg = "loading message...",color}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (openCred) {
      setOpen(true);
    }
  }, [openCred]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Snackbar
      
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={msg}
      >
        <Alert
          onClose={handleClose}
          severity={color}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {msg}
        </Alert></Snackbar>
    </div>
  );
}
