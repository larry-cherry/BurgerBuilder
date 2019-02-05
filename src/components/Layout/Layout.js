import React from 'react';
import AuxComp from '../../hoc/AuxComp';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
// import sideDrawer from '../Navigation/SideDrawer/SideDrawer';

const layout = (props) => (
    <AuxComp>
        <Toolbar/>
        <SideDrawer/>
        <main className={classes.Content}>
            {props.children}
        </main>
    </AuxComp>
)

export default layout;