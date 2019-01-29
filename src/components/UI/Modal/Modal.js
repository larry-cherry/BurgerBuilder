import React from 'react';
import classes from './Modal.css';
import AuxComp from '../../../hoc/AuxComp';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => (
    <AuxComp>
        <Backdrop 
            show={props.show}
            clicked={props.modalClosed}/>
        <div className={classes.Modal}
            style={{
                transform: props.show ? 'translatey(1)' : 'translateY(-100vph)',
                opacity: props.show ? '1' : '0'
            }}>
            {props.children}
        </div>
    </AuxComp>
);

export default modal;