import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Recipe from './pages/Recipe'
import AddRecipe from './pages/AddRecipe'
import Perfil from './pages/Perfil'
import EditRecipe from './pages/EditRecipe'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path='/' element={<Home />}/>
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route path='recipe/:recipeId' element={<Recipe />} />
          <Route path='recipe/add' element={<AddRecipe />} />
          <Route path='/perfil' element={<Perfil />} />
          <Route path='/recipe/edit/:recipeId' element={<EditRecipe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
