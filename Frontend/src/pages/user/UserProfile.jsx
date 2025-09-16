import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { asyncDeleteUser, asyncUpdateUser } from "../../store/actions/UserActions";
import { toast } from "react-toastify";
import style from "../../styles/UserProfile.module.scss";
import penguenImage from '../../assets/penguen.png'
const UserProfile = () => {
  const user = useSelector((state) => state.userReducer.users);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: user?.username,
      email: user?.email,
      password: user?.password,
    },
  });
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const UpdateUserHandler = (users) => {
    dispatch(asyncUpdateUser(user.id, users));
    console.log(users);
    toast.success("😊 Profile Updated!");
    navigator(-1);
  };

  const DeleteHandler = () => {
    dispatch(asyncDeleteUser(user.id));
    navigator('/login');
  }

  return (
    <div className={style.container}>
      <div className={style.top}>
        <div className={style.dpContainer}>
          <img src="https://i.pinimg.com/1200x/01/c5/f7/01c5f7068531893d8496777e2ece3632.jpg" alt="" />
        </div>
        <div className={style.detail}>
          <p>{user?.username}</p>
          <p>{user?.email}</p>
          <p>{user?.password}</p>
        </div>
      </div>
      <hr />
      <form onSubmit={handleSubmit(UpdateUserHandler)}>
        <h2>Update Section</h2>
        <legend>Username</legend>
        <input
          {...register("username")}
          type="text"
          placeholder="Username"
          required
        />
        <legend>email-ID</legend>
        <input
          {...register("email")}
          type="email"
          placeholder="abc@email.com"
          required
        />
        <legend>Password</legend>
        <input
          {...register("password")}
          type="password"
          placeholder="New Password"
          required
        />
        <button>Update Profile</button>
        <button type="button" onClick={DeleteHandler} className={style.deleteBtn}>Delete</button>
        <img className={style.penguen} src={penguenImage} alt="" />
      </form>
    </div>
  );
};

export default UserProfile;
