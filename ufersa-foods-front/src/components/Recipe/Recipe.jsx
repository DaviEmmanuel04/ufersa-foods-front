import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const api_url = import.meta.env.VITE_API_RECIPES

function Recipe({title, description, image, id, editable, likes, liked}) {

  const [like, setLike] = useState(likes)
  const [isLiked, setIsLiked] = useState(liked)

  const token = localStorage.getItem('token')

  const onClick = async () => {
    axios.defaults.headers.common['Authorization'] = token
    await axios.post(`${api_url}/like/${id}`)
    isLiked ? setLike(like - 1) : setLike(like + 1)
    setIsLiked(!isLiked)
  }
  
  return (
    <>
        <Card sx={{ maxWidth: '264px', minHeight: '330px' }}>
      <CardMedia
        component="img"
        height="168"
        image={image}
        alt={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Box maxHeight={'35px'} sx={{overflowY: 'hidden'}}>
          {description}
        </Box>
        <Typography variant="body2" color="text.secondary" maxHeight={'35px'} textOverflow='ellipsis'>
        </Typography>
      </CardContent>
      <CardActions sx={{display: 'flex', alignItems: 'center', gap: '15px'}}>
        <Link to={`/recipe/${id}`}>
        <Button size="small">Ver receita</Button>
        </Link>
        <Box display={'flex'} gap='5px' alignItems={'center'}>
          {editable ? <Link to={`/recipe/edit/${id}`}><EditIcon /></Link> :
          <>
        <Button onClick={onClick}>
          {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />} 
        </Button>
        <Typography>{like}</Typography>
          </>}
        </Box>
      </CardActions>
    </Card>
    </>
  )
}

export default Recipe