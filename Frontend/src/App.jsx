import React, { useEffect } from 'react'
import style from './styles/App.module.scss'
import MainRoutes from './routes/MainRoutes'
import Nav from './components/Nav'
import { useDispatch } from 'react-redux'
import { asyncCurrentUser } from './store/actions/UserActions'
import { asyncLoadProducts } from './store/actions/ProductActions'
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncLoadProducts());
    dispatch(asyncCurrentUser());
  }, []);
  return (
    <div className={style.container} >
      <Nav />
      <MainRoutes />
    </div>
  )
}

export default App