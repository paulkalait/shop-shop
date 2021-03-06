import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../utils/GlobalState';
import { UPDATE_PRODUCTS, REMOVE_FROM_CART, UPDATE_CART_QUANTITY, ADD_TO_CART } from '../utils/actions';
import { QUERY_PRODUCTS } from '../utils/queries';
import spinner from '../assets/spinner.gif';
import Cart from '../components/Cart';

function Detail() {

 const [state, dispatch ] = useStoreContext()
 const { products, cart }  = state
 const { id } = useParams()

 const addToCart = () => {
  const itemInCart = cart.find((cartItem) => cartItem._id === id)

  if(itemInCart){
    dispatch({
      type: UPDATE_CART_QUANTITY,
      _id: id,
      purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
    })
  }
  if(!itemInCart){
   dispatch({
     type: ADD_TO_CART,
     product: {...currentProduct, purchaseQuantity: 1}
   })
  }
}

const removeFromCart = () => {
  dispatch({
    type: REMOVE_FROM_CART,
    _id: currentProduct._id
  });
}


 //local state
 const [currentProduct, setCurrentProduct] = useState({})

 const { loading, data } = useQuery(QUERY_PRODUCTS)

 



 useEffect(() => {
   if(products.length){
     //checks to see if there's data in our global state's products array. If there is, we use it to figure out which product is the current one that we want to display.
     setCurrentProduct(products.find(product => product._id === id))
   } else if(data){ 
     dispatch({
       type: UPDATE_PRODUCTS,
       products: data.products
     })
   }
 }, [products, data, dispatch, id])

 

  return (
    <>
      {currentProduct ? (
        <div className="container my-1">
          <Link to="/">← Back to Products</Link>

          <h2>{currentProduct.name}</h2>

          <p>{currentProduct.description}</p>

          <p>
            <strong>Price:</strong>${currentProduct.price}{' '}
            <button onClick={addToCart}>Add to Cart</button>
            <button
            disabled={!cart.find(p => p._id === currentProduct._id)}
            onClick={removeFromCart}>Remove from Cart</button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
          
        </div>
        
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Detail;
