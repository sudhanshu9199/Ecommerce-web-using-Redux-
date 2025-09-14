import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import style from "../../styles/UpdateProduct.module.scss";
import { asyncUpdateProducts } from "../../store/actions/ProductActions";
import { toast } from "react-toastify";

const UpdateProduct = () => {
    const { id } = useParams();
    const products = useSelector(state => state.productsReducer.products);
    const product = products?.find(products => products.id == id);
    
  const { register, handleSubmit } = useForm({
    defaultValues: {
      image: product?.image,
      title: product?.title,
      price: product?.price,
            desc: product?.desc,
      category: product?.category,
      store: product?.store
    },
  });
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const UpdateProductHandler = (product) => {
    product.id = id;
    dispatch(asyncUpdateProducts(id, product));
    console.log(product);
    toast.success("😊 Details Updated!");
    navigator(-1);
  };
  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit(UpdateProductHandler)}>
        <div className={style.header}>
            <h2>Update Product</h2>
        <p>Editing product: <strong>{product?.title || "Loading..."}</strong></p>
        </div>
        <input
          {...register("image")}
          type="url"
          placeholder="product image url"
        />
        <input {...register("title")} type="text" placeholder="title" />
        <input
          {...register("price")}
          step={0.1}
          type="number"
          placeholder="0.00"
        />
        <textarea
          {...register("desc")}
          placeholder="product details..."
        ></textarea>
        <div className={style.bottom}>
          <input
            className={style.inputs}
            {...register("category")}
            type="text"
            placeholder="category..."
          />
          <input
            className={style.inputs}
            {...register("store")}
            type="text"
            placeholder="store/company name..."
          />
        </div>

        <button>Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
