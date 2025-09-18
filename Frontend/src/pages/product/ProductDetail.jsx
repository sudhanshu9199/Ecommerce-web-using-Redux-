import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import style from "../../styles/ProductDetail.module.scss";
import { asyncDeleteProducts } from "../../store/actions/ProductActions";
import { toast } from "react-toastify";
import { addToCart } from "../../store/reducers/CartSlice";
import { asyncUpdateUser } from "../../store/actions/UserActions";
import { store } from "../../store/Store";
const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    productsReducer: { products },
    userReducer: { users }, cartReducer: { cart }
  } = useSelector((state) => state);
  const product = products?.find((products) => products.id == id);
  const navigator = useNavigate();

  const DeleteHandler = () => {
    dispatch(asyncDeleteProducts(id));
    toast.success("Deleted!");
    navigator("/products");
  };

  const AddToCartHandler = (product) => {
    dispatch(addToCart(product));
    // dispatch(asyncUpdateUser(users.id, { ...users, cart: [...cart] }));
    setTimeout(() => {
      const updatedCart = store.getState().cartReducer.cart;
    dispatch(asyncUpdateUser(users.id, { ...users, cart: updatedCart }));
    }, 0);
  };

  return product ? (
    <div className={style.container}>
      <img src={product.image} alt="" />
      <div className={style.right}>
        <h2>{product.title}</h2>
        <p className={style.bythe}>
          By <span>{product.store}</span>
        </p>
        <p className={style.price}>
          ₹<span> {product.price}</span>
        </p>
        <p className={style.desc}>{product.desc}</p>
        <button onClick={() => AddToCartHandler(product)}>
          Add to bag
          <i className="ri-shopping-cart-2-line"></i>
        </button>

        <i
          onClick={() => navigator("/products")}
          className={`ri-arrow-left-circle-line ${style.backs}`}
        ></i>

        {users && users?.isAdmin && (
          <div className={style.bottom}>
            <button type="button" onClick={DeleteHandler}>
              Delete
            </button>
            <button onClick={() => navigator(`/update-product/${product.id}`)}>
              Update
            </button>
          </div>
        )}
      </div>
    </div>
  ) : (
    "Loading..."
  );
};

export default ProductDetail;
