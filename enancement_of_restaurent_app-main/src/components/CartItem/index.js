import {useContext} from 'react'
import {FaRegTrashAlt} from 'react-icons/fa'
import CartContext from '../../context/CartContext'
import './index.css'

const CartItem = ({cartItemDetails}) => {
  const {
    dishId,
    dishName,
    dishImage,
    quantity,
    dishCurrency,
    dishPrice,
  } = cartItemDetails
  const {
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    removeCartItem,
  } = useContext(CartContext)

  const onIncreaseQty = () => incrementCartItemQuantity(dishId)

  const onDecreaseQty = () => decrementCartItemQuantity(dishId)

  const onRemoveCartItem = () => removeCartItem(dishId)

  return (
    <li className="cart-item">
      <img src={dishImage} alt={dishName} className="cart-item-image" />
      <div className="cart-item-details">
        <p className="cart-item-name">{dishName}</p>
        <p className="cart-item-price">
          {dishCurrency} {(quantity * dishPrice).toFixed(2)}
        </p>
        <div className="quantity-controller">
          <button
            type="button"
            className="controller-button-1"
            onClick={onDecreaseQty}
          >
            -
          </button>
          <p className="cart-item-quantity">{quantity}</p>
          <button
            type="button"
            className="controller-button-1"
            onClick={onIncreaseQty}
          >
            +
          </button>
        </div>
      </div>
      <button
        type="button"
        className="remove-button"
        onClick={onRemoveCartItem}
      >
        <FaRegTrashAlt className="remove-icon" />
      </button>
    </li>
  )
}

export default CartItem
