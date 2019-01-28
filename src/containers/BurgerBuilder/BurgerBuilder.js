import React, {Component} from 'react';
import AuxComp from '../../hoc/AuxComp';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.3,
    bacon: 0.75,
    cheese: 0.5,
    meat: 1.25
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState (ingredients)  {
        // const ingredients = this.state.ingredients;
        const totalIngredients = Object.keys(ingredients)
            .map( ingriKey => {
               return ingredients[ingriKey]
            })
            .reduce((sum, ele) => {
                return sum + ele
            }, 0)
        this.setState({purchasable: totalIngredients > 0})
        console.log(`Purchasable: ${this.state.purchasable}`)
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;
        const updatedIngrediates = {
            ...this.state.ingredients
        }
        updatedIngrediates[type] = newCount;
        const oldTotal = this.state.totalPrice
        const ingredientPrice = INGREDIENT_PRICES[type];
        const newPrice = oldTotal + ingredientPrice;
        this.setState({ingredients: updatedIngrediates, totalPrice: newPrice});
        this.updatePurchaseState(updatedIngrediates);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return null;
        }
        const newCount = oldCount - 1;
        const updatedIngrediates = {
            ...this.state.ingredients
        }
        updatedIngrediates[type] = newCount;
        const oldTotal = this.state.totalPrice
        const ingredientPrice = INGREDIENT_PRICES[type];
        const newPrice = oldTotal - ingredientPrice;
        this.setState({ingredients: updatedIngrediates, totalPrice: newPrice});
        this.updatePurchaseState(updatedIngrediates);
    } 
    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    render(){
        const disabled = {...this.state.ingredients}
        for(let key in disabled){
            disabled[key] = disabled[key] <= 0;
        }
        console.log(disabled)
        return (
            <AuxComp>
                <Modal show={this.state.purchasing}>
                    <OrderSummary ingredients={this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    disabled={disabled}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    order={this.purchaseHandler}/>
            </AuxComp>
        );
    };
};

export default BurgerBuilder;