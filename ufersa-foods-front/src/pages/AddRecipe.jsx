import { Alert, Box, Button, Snackbar, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'
import Footer from '../components/Footer/Footer'

const api_url = import.meta.env.VITE_API_RECIPES

function AddRecipe() {
    const [imageURL, setImageURL] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [preparation, setPreparation] = useState('')
    const [open, setOpen] = useState(false)

    const token = localStorage.getItem('token')

    const onClose = () => {
        setOpen(false)
        setImageURL('')
        setTitle('')
        setDescription('')
        setIngredients('')
        setPreparation('')
    }
    const addRecipe = () => {
        const body = {
            imageURL: imageURL,
            title: title,
            description: description,
            ingredients: ingredients,
            preparation: preparation,
        }

        axios.defaults.headers.common['Authorization'] = token
        axios.post(`${api_url}/signup`, body)
            .then((response) => {
                setOpen(true)
            })
    }
    return (
        <Box sx={{maxHeight: '100vh', paddingTop: '80px'}}>
            <Box display={'flex'} flexDirection={'column'} gap='50px' sx={{ padding: '0 50px', height: 'calc(100vh - 64px - 80px)', overflow: 'scroll' }}>
                <Typography textAlign={'center'} fontWeight={'bold'}>Crie Sua Receita</Typography>

                <TextField
                    label='URL Imagem'
                    variant='standard'
                    type={'text'}
                    onChange={(e) => setImageURL(e.target.value)}
                    value={imageURL}
                />

                <TextField
                    label='Título'
                    variant='standard'
                    type={'text'}
                    onChange={(e) => { setTitle(e.target.value) }}
                    value={title}
                />

                <TextField
                    multiline
                    label='Descrição'
                    maxRows={3}
                    minRows={3}
                    onChange={(e) => { setDescription(e.target.value) }}
                    value={description}
                />

                <TextField
                    multiline
                    label='Ingedientes(separe com ",": "cebola, batata, carne")'
                    maxRows={3}
                    minRows={3}
                    onChange={(e) => { setIngredients(e.target.value) }}
                    value={ingredients}
                />

                <TextField
                    multiline
                    label='Passo a Passo'
                    maxRows={4}
                    minRows={4}
                    onChange={(e) => { setPreparation(e.target.value) }}
                    value={preparation}
                />

                <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
                    <Alert security='success' width='100%' onClose={onClose}>
                        Receita cadastrada com sucesso
                    </Alert>
                </Snackbar>
                <Button sx={{marginBottom: '20px'}} variant='contained' onClick={addRecipe}>Criar Receita</Button>
            </Box>
            <Footer isAddPage={true}/>
        </Box>
    )
}

export default AddRecipe