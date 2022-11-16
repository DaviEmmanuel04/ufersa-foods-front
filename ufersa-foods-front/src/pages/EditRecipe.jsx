import { Alert, Box, Button, Snackbar, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Footer from '../components/Footer/Footer'
import { Navigate, useParams } from 'react-router-dom'

const api_url = import.meta.env.VITE_API_RECIPES

function EditRecipe() {
    const [recipe, setRecipe] = useState({})
    const [imageURL, setImageURL] = useState('')
    const [description, setDescription] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [preparation, setPreparation] = useState('')
    const [open, setOpen] = useState(false)
    const [navigate, setNavigate] = useState(false)

    const token = localStorage.getItem('token')
    const { recipeId } = useParams('recipeId')


    const onClose = () => {
        setOpen(false)
        setNavigate(true)
    }
    const editRecipe = () => {
        const body = {
            imageURL: imageURL,
            title: title,
            description: description,
            ingredients: ingredients,
            preparation: preparation,
        }
        
    axios.defaults.headers.common['Authorization'] = token
    axios.put(`${api_url}/${recipeId}`, body)
            .then((response) => {
                setOpen(true)
            })
    }

    const getRecipe = (url) => {
        axios.defaults.headers.common['Authorization'] = token
        axios.get(url)
            .then((response) => {
                setRecipe(response.data)
            })
    }

    useEffect(() => {
        const url = `${api_url}/${recipeId}`
        getRecipe(url)
    },[])

    useEffect(() => {
        setTitle(recipe.title)
        setImageURL(recipe.imageURL)
        setDescription(recipe.description)
        setIngredients(recipe.ingredients)
        setPreparation(recipe.preparation)
    }, [recipe])

    const [title, setTitle] = useState(recipe.title)

    return (
        <Box sx={{maxHeight: '100vh', paddingTop: '80px'}}>
            <Box display={'flex'} flexDirection={'column'} gap='50px' sx={{ padding: '0 50px', height: 'calc(100vh - 64px - 80px)', overflow: 'scroll' }}>
                <Typography textAlign={'center'} fontWeight={'bold'}>Crie Sua Receita</Typography>

                <TextField
                    label='URL Imagem'
                    multiline
                    type={'text'}
                    onChange={(e) => setImageURL(e.target.value)}
                    value={imageURL}
                />

                <TextField
                    label='Título'
                    multiline
                    minRows={2}
                    type={'text'}
                    onChange={(e) => { setTitle(e.target.value) }}
                    value={title}
                />

                <TextField
                    multiline
                    label='Descrição'
                    minRows={3}
                    onChange={(e) => { setDescription(e.target.value) }}
                    value={description}
                />

                <TextField
                    multiline
                    label='Ingedientes(separe com ",": "cebola, batata, carne")'
                    minRows={3}
                    onChange={(e) => { setIngredients(e.target.value) }}
                    value={ingredients}
                />

                <TextField
                    multiline
                    label='Passo a Passo'
                    minRows={4}
                    onChange={(e) => { setPreparation(e.target.value) }}
                    value={preparation}
                />

                <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
                    <Alert security='success' width='100%' onClose={onClose}>
                        Receita cadastrada com sucesso
                    </Alert>
                </Snackbar>
                <Button sx={{marginBottom: '20px'}} variant='contained' onClick={editRecipe}>Editar Receita</Button>
            </Box>
            {navigate && <Navigate to='/perfil' />}
            <Footer isAddPage={true}/>
        </Box>
    )
}

export default EditRecipe