import React, {Component} from 'react';
import AuxComp from '../../hoc/AuxComp';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
    render(){
        return (
            <AuxComp>
                <Burger/>
                <div>Build Controls</div>
            </AuxComp>
        );
    };
};

export default BurgerBuilder;