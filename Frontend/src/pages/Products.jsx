import { useDispatch, useSelector } from "react-redux";
import style from "../styles/Products.module.scss";
import { Link } from "react-router";
import { addToCart } from "../store/reducers/CartSlice";
import { asyncUpdateUser } from "../store/actions/UserActions";
import { store } from "../store/Store";
import axios from "../api/axiosConfig";
import { Suspense, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Products = () => {
  const users = useSelector((state) => state.userReducer.users);
  const dispatch = useDispatch();

  const [products, setproducts] = useState([]);
  const [hasMore, sethasMore] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        `/products?_limit=6&_start=${products.length}`
      );
      if (data.length === 0) sethasMore(false);
      else {
        sethasMore(true);
        setproducts([...products, ...data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
    <div >
      <InfiniteScroll
        dataLength={products.length}
        next={fetchProducts}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p>
            <b>All~</b>
          </p>
        } className={style.container}
      >
        <Suspense
          fallback={<h1 className="text-center text-xl">LOADING...</h1>}
        >
          {renderProduct}
        </Suspense>
      </InfiniteScroll>
    </div>
  ) : (
    "Loading..."
  );
};

export default Products;
