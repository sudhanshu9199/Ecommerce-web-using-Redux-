import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
import { asyncRegisterUser } from "../store/actions/UserActions";
import style from "../styles/Register.module.scss";
import { toast } from "react-toastify";
const Register = () => {
  const { register, reset, handleSubmit } = useForm();
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const registerHandler = (user) => {
    user.id = nanoid();
    user.cart = [];
    if (user.adminCode == 7431) user.isAdmin = true;
    else user.isAdmin = false;
    delete user.adminCode;
    dispatch(asyncRegisterUser(user));
    reset();
    navigator("/login");
    toast("🎉Registered successfully!");
  };
  return (
    <div className={style.container}>
      <div className={style.text}>
        <h2>Welcome Back!</h2>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
      </div>
      <form onSubmit={handleSubmit(registerHandler)}>
        <h2>Sign Up</h2>
        <input
          {...register("username")}
          type="text"
          placeholder="Username"
          required
        />
        <input
          {...register("email")}
          type="email"
          placeholder="abc@email.com"
          required
        />
        <input
          {...register("password")}
          type="password"
          placeholder="New Password"
          required
        />
        <input
          {...register("adminCode")}
          type="number"
          placeholder="admin code...(if have)"
        />
        <button>Sign Up</button>
        <p>
          Already have an account?{" "}
          <Link className={style.links} to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
