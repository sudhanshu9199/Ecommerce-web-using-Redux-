import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import style from '../../styles/ProductDetail.module.scss'
import { asyncDeleteProducts } from "../../store/actions/ProductActions";
import { toast } from "react-toastify";
const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    productsReducer: { products },
    userReducer: { users }
  } = useSelector((state) => state);
  const product = products?.find((products) => products.id == id);
  const navigator = useNavigate();

  const DeleteHandler = () => {
    dispatch(asyncDeleteProducts(id));
    toast.success('Deleted!')
    navigator('/products');
  }

  
  return product ? (
    <div className={style.container}>
      <img src={product.image} alt="" />
      <div className={style.right}>
        <h2>{product.title}</h2>
        <p className={style.bythe}>By <span>{product.store}</span></p>
          <p className={style.price}>₹<span> {product.price}</span></p>
          <p className={style.desc}>{product.desc}</p>
          <button>Add to bag
            <i className="ri-shopping-cart-2-line"></i></button>

          <i onClick={() => navigator('/products')} className={ `ri-arrow-left-circle-line ${style.backs}`}></i>

          {users && users?.isAdmin && <div className={style.bottom}>
            <button type="button" onClick={DeleteHandler}>Delete</button>
            <button>Update</button>
          </div>}
      </div>
    </div>
  ) : ("Loading...");
};

export default ProductDetail;
