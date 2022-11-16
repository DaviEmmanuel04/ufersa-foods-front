import { Box } from '@mui/material'
import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';

function Footer({ isAddPage = false }) {
    return (
        <Box
            sx={{ height: '64px', width: '100vw', backgroundColor: '#1976D2', zIndex: '2' }}
            display='flex'
            alignItems={'center'}
            justifyContent={'space-around'}
        >
            <Link>
                <FavoriteIcon sx={{ color: '#fff', fontSize: '40px' }} />
            </Link>
            
            <Link to={'/recipe/add'}>
                <AddCircleIcon sx={{ color: '#fff', fontSize: '40px' }} />
            </Link>

            <Link to='/'>
                <HomeIcon sx={{ color: '#fff', fontSize: '40px' }} />
            </Link>

            <Link to='/perfil'>
                <AccountCircleIcon sx={{ color: '#fff', fontSize: '40px' }} />
            </Link>

        </Box>
    )
}

export default Footer