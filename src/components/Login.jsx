import { TextField, Box } from "@mui/material"
import Grid from '@mui/material/Grid2';
import { useState } from "react";
import Button from '@mui/material/Button';
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function Login() {
  const [open, setOpen] = React.useState(true);

  const defaultLoginObj = {
        userEmail: '',
        password: ''
    }

    const [loginFormData, setLoginFormData] = useState(defaultLoginObj);

    const onLoginFormControlChange = (event) => {
        setLoginFormData({
            ...loginFormData,
            [event.currentTarget.id]: event.currentTarget.value
        });
    }

    const onSigninClick = () => {
        console.log(loginFormData);        
    }


    const onSignIn = (event) => {
        event.preventDefault();
        onSigninClick();
        setOpen(false);
    }


    return (
        <React.Fragment>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>Sign In</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
              <Box sx={{ flexGrow: 1 }}>
                <form onSubmit={onSignIn}>
                    <Grid sx={{ margin: 2 }} container spacing={{ xs: 3, md: 3 }} columns={{ xs: 1, sm: 1, md: 1 }}>
                        <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                            <TextField required id="userEmail" label="Email" variant="outlined" value={loginFormData.userEmail} onChange={onLoginFormControlChange} />
                        </Grid>
                        <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                            <TextField required id="password" label="Password" variant="outlined" value={loginFormData.password} onChange={onLoginFormControlChange} />
                        </Grid>
                    </Grid>
                    
                </form>
            </Box>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Button type="submit" variant="contained" onClick={onSignIn}>
                            Sign In
                        </Button>
            </Grid>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      );
}