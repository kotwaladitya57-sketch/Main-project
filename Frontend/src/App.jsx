import { Routes, Route } from 'react-router-dom'
import Login from './Page/LogIn'
import About from './Page/About'
import Notfound from './Notfound'
import Products from './Page/Product'
import Deatil from './Page/Deatil'
import UserDashboard from './Page/userDashboard'
import './Page/Page.css'
import Addtocart from './Page/Addtocart'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Register from './Page/Register'


function App() {

  return (
    <div >
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/product' element={<Products />} />
        <Route path='/product/:id' element={<Deatil />} />
        <Route path='/addtocart' element={<Addtocart />} />
        <Route path='/userDashboard' element={<UserDashboard />} />
        <Route path='*' element={<Notfound />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
