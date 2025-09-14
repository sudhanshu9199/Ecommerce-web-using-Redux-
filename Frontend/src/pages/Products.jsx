import { useSelector } from 'react-redux'
import style from '../styles/Products.module.scss';
import { Link } from 'react-router';

const Products = () => {
  const products = useSelector(state => state.productsReducer.products);
  console.log(products);

  const renderProduct = products.map((products) => {
    return (
      <div key={products.id} className={style.card}>
        <img src={products.image} alt={`${products.title} image`} />
        <h2>{products.title}</h2>
        <p>{products.desc.slice(0, 100)}...
          <Link to={`/product/${products.id}`} className={style.link}>more info.</Link>
        </p>
        <div className={style.bottom}>
          <p className={style.price}>₹{products.price}</p>
          <p className={style.cart}>Add to cart</p>
        </div>
      </div>
    )
  })
  
  return (
    products.length > 0 ? <div className={style.container}>{renderProduct}</div> : 'Loading...'
  )
}

export default Products