import {Link} from 'react-router-dom'
import {useContext} from 'react'
import Header from '../Header'
import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'
import './index.css'

const Cart = () => {
  const {cartList, removeAllCartItems} = useContext(CartContext)

  const renderEmptyView = () => (
    <div className="empty-cart-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
        alt="empty view"
        className="empty-cart-image"
      />
      <p className="empty-cart-text">Your cart is Empty.</p>
      <Link to="/">
        <button className="go-back-button">Go Back</button>
      </Link>
    </div>
  )

  const renderCartItems = () => (
    <>
      <div className="cart-header">
        <h1 className="cart-title">Cart Items</h1>
        <button
          type="button"
          className="remove-all-button"
          onClick={removeAllCartItems}
        >
          Remove All
        </button>
      </div>
      <ul className="cart-items-list">
        {cartList.map(dish => (
          <CartItem key={dish.dishId} cartItemDetails={dish} />
        ))}
      </ul>
    </>
  )

  return (
    <div>
      <Header />
      <div className="cart-content">
        {cartList.length === 0 ? renderEmptyView() : renderCartItems()}
      </div>
    </div>
  )
}

export default Cart
