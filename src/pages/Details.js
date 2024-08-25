import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../styles/Details.css'
import Admin from './components/Admin'
import User from './components/User'
import { Button, Paper } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import sweetAlert from 'sweetalert'

const Details = () => {
  const token = sessionStorage.getItem('token')
  const navigate = useNavigate()
  const [data, setData] = useState()

  useEffect(() => {
    fetchDetails()
  }, [])

  const fetchDetails = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/getDetails`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.log(err)
        const error = err.response.data

        sweetAlert(
          error?.message ?? 'Oops...',
          error?.description ?? 'Something went wrong!',
          'error'
        )
      })
  }

  const logout = () => {
    sessionStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className="wrapper">
      <Paper elevation={4} className="details-container">
        <h1 style={{ textAlign: 'center' }}>User Details</h1>

        <div className="details">
          {data?.isAdmin ? (
            <Admin data={data} fetchDetailsFn={fetchDetails} />
          ) : (
            <User data={data} />
          )}
        </div>
      </Paper>
      <Button
        className="logout"
        color="info"
        variant="contained"
        onClick={logout}
      >
        Logout
      </Button>
    </div>
  )
}

export default Details
