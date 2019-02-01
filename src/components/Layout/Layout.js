import React from 'react';
import AuxComp from '../../hoc/AuxComp';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

const layout = (props) => (
    <AuxComp>
        <Toolbar/>
        <div>Toolbar, Sidedrawer, Backdrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </AuxComp>
)

export default layout;