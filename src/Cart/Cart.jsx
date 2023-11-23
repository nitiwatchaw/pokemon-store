import React, { useEffect } from 'react'
import './Cart.css'
import Lottie from 'lottie-react'
import animationData from '../img//Animation - 1700302195920.json'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
const Cart = ({ cart, setCart }) => {

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const deleteCart = (pokeID) => {
    setCart((prevState) => {
      return prevState.filter(e => e.idn !== pokeID)

    })
    toast.error('deleted Pokemon', {
      position: "top-right",
      autoClose: 300,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  const clear = () => {
    setCart([])
    toast.info('Clear Cart', {
      position: "top-right",
      autoClose: 300,

    });
  }
  const pay = () => {
    setCart([])
    toast.success('Pay Success', {
      position: "top-right",
      autoClose: 1000,

    });
  }


  const cartTotals = cart.reduce((acc, item) => acc + item.id, 0);


  return (
    <>

      {cart.length > 0 ?
        <>
          <div className='cart-cotainer'>

            {cart.map((e) => {
              return (
                <div key={e.idn} className='cart-item'>
                  <div className="cart-content">
                    <img src={e.sprites.front_default} alt="" width={120} />
                    <div className="name">{e.name}</div>
                    <div className="cost">Cost:  <span>${e.id}</span> </div>
                  </div>
                  <button onClick={() => { deleteCart(e.idn) }}>Delete</button>
                </div>
              )
            })}


          </div>

          <div className="payment-container">
            <div className="cost">
              <p style={{ marginRight: "10px" }}>Total Cost  <span>${cartTotals}</span></p>
            </div>
            <div className="wrap-btn">
              <button onClick={clear}>Clear Cart</button>
              <Link to="/">
                <button onClick={pay}>Buy now</button>
              </Link>
            </div>
          </div>

        </>
        :
        <div className='lottie'>
          <Lottie animationData={animationData} className='ani' />
          <p>Your cart is empty</p>
          <Link to="/store/list">Go to Shop</Link>
        </div>

      }


    </>
  )
}

export default Cart