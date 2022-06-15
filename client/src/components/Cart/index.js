import React from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { FaTimes} from 'react-icons/fa'
import { TOGGLE_CART } from "../../utils/actions";
import CartItem from "../CartItem";
import { Link } from 'react-router-dom';
import Auth from "../../utils/auth";
import "./style.css";

const Cart = () => {
const [state, dispatch ] = useStoreContext();

console.log(state)
function toggleCart(){
    //does a flip
    dispatch({ type: TOGGLE_CART})
}

function calculateTotal(){
    let sum = 0;
    //adds up the prices in state.cart
    state.cart.forEach(item => {
        sum += item.price * item.purchaseQuantity
    })
    
    //round sum
    return sum.toFixed(2)
}



//if cart is closed..
if(!state.cartOpen){
    return(
        <div className ='cart-closed' onClick={toggleCart}>
        <span
        role='img'
        aria-label="trash">
        🛒
        </span>
        </div>
    )
}


  return (
    <div className="cart">
      <div className="close" onClick={toggleCart}>
        <FaTimes />
      </div>
      <h2>Shopping Cart</h2>
     {state.cart.length ? (
         <div>
         {state.cart.map(item => (
            <CartItem key={item._id} item={item} />
         ))}
       <div className="flex-row space-between">
       <strong>Total: ${calculateTotal()} </strong>
       {
           Auth.loggedIn() ? 
           <button>
           Checkout
           </button>
           :
           <Link to="/login"> (login in to check out)</Link>
       }
       </div>
       
        </div> ) : (
            <h3>
            <span role='img' aria-label="shocked">  😱</span>
            You havent added anything to your cary yet!
            </h3>

        )} 
    </div>
  );
};

export default Cart;
