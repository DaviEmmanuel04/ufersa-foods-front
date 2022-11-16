import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer/Footer'
import axios from 'axios'
import Recipe from '../components/Recipe/Recipe'

const api_url = import.meta.env.VITE_API_RECIPES

function Perfil() {
    const token = localStorage.getItem('token')
    const {id} = JSON.parse(atob(token.split('.')[1]))

    const [recipes, setRecipes] = useState([])

    const getRecipes = (url) => {
        axios.defaults.headers.common['Authorization'] = token
        axios.get(url)
            .then((response) => {
                setRecipes(response.data)
            })

    }

    useEffect(() => {
        const url = `${api_url}/user/${id}`
        getRecipes(url)
    }, [])
    

    return (
    <Box maxHeight='100vh'>
        <Box height='calc(100vh - 64px)' overflow={'scroll'}>
            {recipes.length > 0 
            ?
            <>
            <Typography fontWeight={'bold'} sx={{ margin: '30px  0 20px 30px' }}>Suas receitas:</Typography>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', overflow: 'scroll'}}>
                {
                    recipes.map((recipe) => <Recipe title={recipe.title} description={recipe.description} image={recipe.imageURL} id={recipe.id} editable={true}/>)
                }
            </Box>
            </>
            :
            <Typography>Você ainda não possui receitas</Typography>
            }
        </Box>
        <Footer />
    </Box>
  )
}

export default Perfil