import { useDispatch, useSelector } from "react-redux"
import { asyncUpdateUser } from "../store/actions/UserActions";
import { loadCart } from "../store/reducers/CartSlice";
import style from '../styles/Cart.module.scss';

const Cart = () => {
    const dispatch = useDispatch();

    const users = useSelector(s => s.userReducer?.users);
    const carts = useSelector(s => s.cartReducer?.carts) || [];

    const cartItem = Array.isArray(users?.cart) && users.cart.length ? users.cart : carts;

    const IncreaseQuantityHandler = (index) => {
        if (users) {
            const copyUser = { ...users, cart: [...users.cart] };
            copyUser.cart[index] = {
                ...copyUser.cart[index],
                quantity: (copyUser.cart[index].quantity || 0) + 1,
            };
            dispatch(asyncUpdateUser(copyUser.id, copyUser));
        }
        else {
            const copyCarts = carts.map((c, i) => i === index ? { ...c, quantity: (c.quantity || 0) + 1} : c);
            dispatch(loadCart(copyCarts));
        }
    };

    const DecreaseQuantityHandler = (index) => {
        if (users) {
            const copyUser = { ...users, cart: [...users.cart] };
            const currentQty = copyUser.cart[index]?.quantity || 0;

            if (currentQty > 1) {
                copyUser.cart[index] = {
                    ...copyUser.cart[index],
                    quantity: currentQty - 1,
                };
            }
            else {
                copyUser.cart.splice(index, 1);
            }
            dispatch(asyncUpdateUser(copyUser.id, copyUser));
        }
        else {
            const copyCarts = [...carts];
            const currentQty = copyCarts[index]?.quantity || 0;

            if (currentQty > 1) copyCarts[index] = { ...copyCarts[index], quantity: currentQty - 1};
            else copyCarts.splice(index, 1);

            dispatch(loadCart(copyCarts));
        }
    };

    if (!cartItem || cartItem.length === 0) return <p>Your cart is empty</p>

    const cartItems = cartItem.map((c, index) => {
        const product = c?.products || c?.product || c;
        const qty = c?.quantity ?? 1;

        return (
            <li key={product?.id ?? index}>
                <div className={style.productLeft}>
                    <img src={product?.image} alt={product?.title || ""} />
                <p>{product?.title}</p>
                </div>
                <div className={style.qtyContainer}>
                    <button onClick={() => DecreaseQuantityHandler(index)}>-</button>
                    <span>{qty}</span>
                    <button onClick={() => IncreaseQuantityHandler(index)}>+</button>
                </div>
                <p className={style.price}>₹{product?.price}</p>
            </li>
        )
    })
  return (
    <div className={style.container}>
        <div className={style.header}>
            <p>Selected Products</p>
            <p>Quantity</p>
            <p>Total</p>
        </div>
        
        <ul>{cartItems}</ul>
    </div>
  )
}

export default Cart