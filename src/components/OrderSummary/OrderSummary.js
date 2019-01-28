import React from 'react';
import AuxComp from '../../hoc/AuxComp';

const orderSummary = (props) => {
    console.log(props.ingredients)
    const ingredientSummary = Object.keys(props.ingredients)
        .map( (igKey)=> {
            return (
                <li key={igKey}>
                    <span style={{textTransform: "capitalize"}}>
                        {igKey}:
                    </span>
                    {props.ingredients[igKey]}
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
            <p>Continue to Checkout?</p>
        </AuxComp>
    )
};

export default orderSummary;