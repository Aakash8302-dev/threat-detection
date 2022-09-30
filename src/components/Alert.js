import * as React from 'react';
import MuiAlert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';

const Alert = (AlertObj) => {
    const { notify, setNotify } = AlertObj;

    const alertClose = (reason) => {
        if (reason === "clickaway") {
            return;
        }

        setNotify({
            ...notify,
            isOpen: false,
        })
    }


    return (
        <Snackbar
            open={notify.isOpen}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            onClose={alertClose}
        >
            <MuiAlert severity={notify.type} onClose={alertClose}>
                {notify.message}
            </MuiAlert>
        </Snackbar>
    )
}

export default Alert