import React from 'react';
import classes from './Modal.css';
import { Transform } from 'stream';

const modal = (props) => (
    <div className={classes.Modal}
        style={{
            Transform: props.show ? 'translatey(1)' : 'translateY(-100vph)',
            opacity: props.show ? '1' : '0'
        }}>
        {props.children}
    </div>
);

export default modal;