import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import style from "../../styles/CreateProduct.module.scss";
import { toast } from "react-toastify";
import { asyncCreateProducts } from "../../store/actions/ProductActions";
import { nanoid } from "nanoid";

const CreateProduct = () => {
  const { register, reset, handleSubmit } = useForm();
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const CreateProductHandler = (product) => {
    product.id = nanoid();
    dispatch(asyncCreateProducts(product))
        console.log(product);
    reset();
    toast.success('✌️Created successfully!')
    navigator("/products");
  };
  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit(CreateProductHandler)}>
        <h2>Create Product</h2>
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
          <input className={style.inputs}
          {...register("category")}
          type="text"
          placeholder="category..."
        />
        <input className={style.inputs}
          {...register("store")}
          type="text"
          placeholder="store/company name..."
        />
        </div>

        <button>Create Product</button>
      </form>
    </div>
  );
};

export default CreateProduct;
