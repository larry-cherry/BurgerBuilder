import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const controls =  [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
]

const buildControls = (props) => (
    <div className={classes.BuildControls} id=''>
        <p>Current Price: ${props.price.toFixed(2)}</p>
        {controls.map( control => (
            <BuildControl 
                key={control.label} 
                label={control.label}
                type={control.type}
                added={ () => {props.ingredientAdded(control.type)}}
                remove={() => {props.ingredientRemoved(control.type)}}
                disable={props.disabled[control.type]}/>
        ))}
        <button className={classes.OrderButton}
            disabled={!props.purchasable}>Order Now</button>
    </div>
);

export default buildControls;