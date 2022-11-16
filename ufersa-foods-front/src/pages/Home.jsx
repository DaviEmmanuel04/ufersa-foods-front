import React, { useEffect, useId } from 'react'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import Recipe from '../components/Recipe/Recipe'
import { Box } from '@mui/material'
import Footer from '../components/Footer/Footer'

const api_url = import.meta.env.VITE_API_RECIPES

function Home() {

    const [token, setToken] = useState(localStorage.getItem('token'))
    const [recipes, setRecipes] = useState([])
    const [likes, setLikes] = useState([])

    const getRecipes = async () => {
        axios.defaults.headers.common['Authorization'] = token
        await axios.get(api_url)
            .then((response) => {
                setRecipes(response.data?.recipes)
            })
    }

    const getLikes = async (url) => {
        axios.defaults.headers.common['Authorization'] = token
        await axios.get(url)
            .then((response) => {
                const l = response.data.map((r) => r.recipeId)
                setLikes(l)
            })
    }

    useEffect(() => {
        getRecipes()
    }, [])

    useEffect(() => {
        const {id} = JSON.parse(atob(token.split('.')[1]))
        const url = `${api_url}/like/${id}`
        getLikes(url)
    }, [])

    return (
        <div style={{maxHeigt: '100vh'}}>
            {!token &&
                <Navigate to={'/login'} />
            }
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', height: 'calc(100vh - 64px)', overflow: 'scroll'}}>
                {
                    recipes.map((recipe) => <Recipe key={recipe.id} title={recipe.title} description={recipe.description} image={recipe.imageURL} id={recipe.id} likes={recipe.likes} liked={likes.includes(recipe.id)} />)
                }
            </Box>

            <Footer />
        </div>
    )
}

export default Home