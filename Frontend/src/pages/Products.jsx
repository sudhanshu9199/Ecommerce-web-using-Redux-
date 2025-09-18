import { useDispatch, useSelector } from "react-redux";
import style from "../styles/Products.module.scss";
import { Link } from "react-router";
import { addToCart } from "../store/reducers/CartSlice";
import { asyncUpdateUser } from "../store/actions/UserActions";
import { store } from "../store/Store";

const Products = () => {
  const products = useSelector((state) => state.productsReducer.products);
  const users = useSelector((state) => state.userReducer.users);
  const cart = useSelector((state) => state.cartReducer.cart);
  const dispatch = useDispatch();

  const AddToCartHandler = (product) => {
    dispatch(addToCart(product));
    // dispatch(asyncUpdateUser(users.id, { ...users, cart: [...cart] }));
    setTimeout(() => {
      const updatedCart = store.getState().cartReducer.cart;
    dispatch(asyncUpdateUser(users.id, { ...users, cart: updatedCart }));
    }, 0);
  };

  const renderProduct = products.map((products) => {
    return (
      <div key={products.id} className={style.card}>
        <img src={products.image} alt={`${products.title} image`} />
        <h2>{products.title}</h2>
        <p>
          {products.desc.slice(0, 100)}...
          <Link to={`/product/${products.id}`} className={style.link}>
            more info.
          </Link>
        </p>
        <div className={style.bottom}>
          <p className={style.price}>₹{products.price}</p>
          <p className={style.cart} onClick={() => AddToCartHandler(products)}>
            Add to cart
          </p>
        </div>
      </div>
    );
  });

  return products.length > 0 ? (
    <div className={style.container}>{renderProduct}</div>
  ) : (
    "Loading..."
  );
};

export default Products;
