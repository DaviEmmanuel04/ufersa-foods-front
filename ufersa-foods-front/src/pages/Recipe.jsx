import { Box, Typography } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import Footer from '../components/Footer/Footer'

const api_url = import.meta.env.VITE_API_RECIPES

function Recipe() {
    const [recipe, setRecipe] = useState({})

    const { recipeId } = useParams('recipeId')
    const token = localStorage.getItem('token')

    const getRecipe = async (url) => {
        axios.defaults.headers.common['Authorization'] = token
        await axios.get(url)
            .then((response) => {
                setRecipe(response.data)
            })
    }

    const formatIngredients = (ingredients) => {
        const result = ingredients.split(',')
        return result
    }

    useEffect(() => {
        const url = `${api_url}/${recipeId}`
        getRecipe(url)
    }, [])
    return (
        <>
        <Box overflow={'scroll'} height='calc(100vh - 64px)'>
            
            <Box display='flex' flexDirection={'column'} alignItems='center' sx={{margin: '80px 0'}}>
                <img src={recipe.imageURL} alt="" style={{ width: '264px' }} />
                <Typography fontSize={'18px'} fontWeight='bold' >{recipe.title}</Typography>
            </ Box>
            <Box sx={{maxHeight: 'calc(100vh - 64px)'}}>
                <Typography fontSize={'18px'} sx={{ marginLeft: '25px' }}>Ingredientes</Typography>
                {recipe.ingredients?.length > 0 &&
                    <ul style={{ margin: '8px 40px' }}>
                        {formatIngredients(recipe.ingredients).map((ingrdient, index) => <li key={index} style={{ textTransform: 'capitalize' }}><Typography fontSize={'12px'}>{ingrdient}</Typography></li>)}
                    </ul>
                }

                <Typography fontSize={'18px'} sx={{ marginLeft: '25px' }}>Modo de preparo</Typography>
                <Typography fontSize={'12px'} sx={{marginLeft: '25px'}}>{recipe.preparation}</Typography>
            </Box>
        </Box>
            <Footer />
        </>
    )
}

export default Recipe