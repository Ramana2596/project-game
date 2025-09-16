import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

const EnrollDialog = ({ open, onClose, onEnroll }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Alert</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Do you want to enroll for the game?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="secondary">No</Button>
      <Button onClick={onEnroll} color="primary" autoFocus>Yes</Button>
    </DialogActions>
  </Dialog>
);

export default EnrollDialog;
