import React from 'react'
import TextField from '@mui/material/TextField';
import { Box, Button } from '@mui/material';
import { useState } from 'react';
import axios from 'axios'
import { Link, Navigate } from 'react-router-dom';
import logo from '../assets/logo.png'

const api_url = import.meta.env.VITE_API_USERS

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [token, setToken] = useState('')

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const login = () => {
        const body = {
            email: email,
            password: password,
        }

        axios.post(`${api_url}/login`, body)
            .then((response) => {
                localStorage.setItem('token', response.data?.token)
                setToken(response.data?.token)
            })
            .catch((erro) => {
                console.log(erro.response.data);
            })       
    }
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <img style={{marginTop: '104px'}} src={logo} alt="" />
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '57px'}}>
            <TextField value={email} onChange={onChangeEmail} sx={{marginBottom: '50px', width: '100%'}} variant='standard' label='E-mail' type='email' />
            <TextField value={password} onChange={onChangePassword} sx={{marginBottom: '50px', width: '100%'}} variant='standard' label='Senha' type='password'/>
            
            <Button onClick={login} variant='contained' sx={{marginBottom: '15px', width: '100%'}}>Entrar</Button>
            <Link to='/signup' style={{width: '100%'}}>
                <Button variant='outlined' sx={{width: '100%'}}>Criar conta</Button>
            </Link>
        </Box>

        {token && <Navigate to={'/'} />}
    </Box>
  )
}

export default Login