import React, { useState, useEffect } from 'react';
import Collapse from '@mui/material/Collapse';

function CollapsibleFormControl(props) {

    const isCollapsed = props.collapse;

    return (
        <Collapse in={isCollapsed} orientation="vertical" timeout={'auto'}>
            {props.children}
        </Collapse>
    )
}

export default CollapsibleFormControl;