import React, {Component} from 'react';
import AuxComp from '../../../hoc/AuxComp/AuxComp';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    // console.log(this.props.ingredients);
    componentWillUpdate() {
        console.log('[Order Summary WillUpdate]')
    }
    render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
        .map( (igKey)=> {
            return (
                <li key={igKey}>
                    <span style={{textTransform: "capitalize"}}>
                        {igKey}:
                    </span>
                    {this.props.ingredients[igKey]}
                </li>
            )
        })
        return (
            <AuxComp>
                <h3>You Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCanceled}>Cancel</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue}>Continue</Button>
            </AuxComp>
        )
    }


    
};

export default OrderSummary;