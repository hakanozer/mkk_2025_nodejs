import React, { JSX, useEffect } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import apiConfig from '../services/apiConfig';

function Control( props: {item: JSX.Element} ) {

  const location = useLocation();
  const navigate = useNavigate();
  const stToken = localStorage.getItem('jwt')
  useEffect(() => {
    apiConfig.get('users/profile').then(res => {
      // all good
    }).catch(err => {
        //localStorage.removeItem('jwt')
        //apiConfig.defaults.headers.common['Authorization'] = '';
        //navigate('/', {replace: true});
    })
  }, [location, navigate]);
          
  return (
    stToken ? props.item : <Navigate to='/' replace={true} />
  )
}

export default Control