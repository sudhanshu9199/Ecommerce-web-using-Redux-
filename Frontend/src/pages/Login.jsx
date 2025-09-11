import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { asyncLoginUser } from "../store/actions/UserActions";
import { useDispatch } from "react-redux";
import style from "../styles/Login.module.scss";

const Login = () => {
  const { register, reset, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const loginHandler = (user) => {
    dispatch(asyncLoginUser(user));
    reset();
  };
  return (
    <div className={style.container}>
        <form onSubmit={handleSubmit(loginHandler)}>
            <h2>Login</h2>
          <input
            {...register("email")}
            type="email"
            placeholder="abc@email.com"
          />
          <input
            {...register("password")}
            type="password"
            placeholder="******"
          />
          <button>Login</button>
          <p>
            Don't have an account? <Link className={style.links} to="/register">Sign Up</Link>
          </p>
        </form>
      <div className={style.text}>
        <h2>Welcome Back!</h2>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
      </div>
    </div>
  );
};

export default Login;
