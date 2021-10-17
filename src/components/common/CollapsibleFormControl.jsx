import React, { useState, useEffect } from 'react';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

function CollapsibleFormControl(props) {

    const isCollapsed = props.collapse;

    return (
        <Collapse in={isCollapsed} orientation="vertical" timeout='auto'>
            {props.children}
        </Collapse>
    )
}

export default CollapsibleFormControl;