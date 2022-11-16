import React from 'react'
import TextField from '@mui/material/TextField';
import { Box, Button } from '@mui/material';
import { useState } from 'react';
import axios from 'axios'
import { Navigate } from 'react-router-dom';
import logo from '../assets/logo.png'

const api_url = import.meta.env.VITE_API_USERS

function Signup() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [token, setToken] = useState('')

  const onChangeEmail = (e) => {
    setEmail(e.target.value)
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const login = () => {
    const body = {
      name: name,
      email: email,
      password: password,
    }

    if (password === confirmPassword) {
      axios.post(`${api_url}/signup`, body)
        .then((response) => {
          localStorage.setItem('token', response.data?.token)
          setToken(response.data?.token)
        })
        .catch((erro) => {
          console.log(erro.response.data);
        })
    }else {
      alert('As senhas estão diferentes')
    }
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <img style={{ marginTop: '104px' }} src={logo} alt="" />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '57px' }}>
        <TextField value={name} onChange={(e) => setName(e.target.value)} sx={{ marginBottom: '50px', width: '100%' }} variant='standard' label='Nome' type='text' />
        <TextField value={email} onChange={onChangeEmail} sx={{ marginBottom: '50px', width: '100%' }} variant='standard' label='E-mail' type='email' />
        <TextField value={password} onChange={onChangePassword} sx={{ marginBottom: '50px', width: '100%' }} variant='standard' label='Senha' type='password' />
        <TextField value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} sx={{ marginBottom: '50px', width: '100%' }} variant='standard' label='Confirmar senha' type='password' />


        <Button onClick={login} variant='contained' sx={{ marginBottom: '15px', width: '100%' }}>Entrar</Button>
        <Button variant='outlined' sx={{ width: '100%' }}>Criar conta</Button>
      </Box>

      {token && <Navigate to={'/'} />}
    </Box>
  )
}

export default Signup