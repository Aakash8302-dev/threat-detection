import React from 'react';
import { CircularProgress } from '@mui/material';

const styles = {
    buttonProgress: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    },
};

const Loader = () => {

    return (
        <div>
            <CircularProgress sx={{ ...styles.buttonProgress }} />
        </div>
    );
};

export default Loader;
