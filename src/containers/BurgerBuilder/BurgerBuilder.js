import React, {Component} from 'react';
import AuxComp from '../../hoc/AuxComp/AuxComp';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
// import spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.3,
    bacon: 0.75,
    cheese: 0.5,
    meat: 1.25
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false

    }

    componentDidMount(){
        axios.get('https://react-my-burger-8a949.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch( error => {
                // console.log("error!!!!!")
                this.setState({error: true});
            });
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
        // console.log(`Purchasable: ${this.state.purchasable}`)
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

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        // alert("You continue!");
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Larry Cherry',
                address: {
                    street: '1400 Coke St',
                    zipCode: '77843',
                    country: 'United States'
                },
                email: 'mail@larrycherry.com'
            },
            deliveryMethod: 'fastest'
        };
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false, purchasing: false});
            }).catch(error => {
                this.setState({loading: false, purchasing: false});
            });

    }

    render(){
        const disabled = {...this.state.ingredients}
        for(let key in disabled){
            disabled[key] = disabled[key] <= 0;
        }
        let orderSummary = null;
        if(this.state.loading){
            orderSummary = <Spinner/>
        }
        // console.log(disabled)
        // console.log(`Error Occured?: ${this.state.error}`)
        let burger = this.state.error ? <p style={{color: "red", marginTop: "50px", textAlign: "center"}}>Ingredients Can't Be Loaded</p> : <Spinner/>;
        if(this.state.ingredients){
            burger = (
                <AuxComp>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        disabled={disabled}
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        order={this.purchaseHandler}/>
                </AuxComp>
            )
            orderSummary = (
                <OrderSummary 
                                ingredients={this.state.ingredients}
                                purchaseCanceled={this.purchaseCancelHandler}
                                purchaseContinue={this.purchaseContinueHandler}
                                price={this.state.totalPrice}/>

            );
        };
        return (
            <AuxComp>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                   {orderSummary}
                </Modal>
                {burger}
            </AuxComp>
        );
    };
};

export default withErrorHandler(BurgerBuilder, axios);