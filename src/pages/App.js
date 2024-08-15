import React from 'react'
import '../styles/App.css'
import { Button, Paper, TextField } from '@mui/material'

import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import validator from 'validator'
import axios from 'axios'
import sweetAlert from 'sweetalert'

const App = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm()

  const checkValidations = (data) => {
    const isValidUsername = validator.isEmail(data.username)
    const isValidPassword =
      validator.isAlphanumeric(data.password) && data.password?.length == 8

    if (!isValidUsername) {
      setError('username', {
        type: 'manual',
        message: 'Please enter a valid email',
      })
    }

    if (!isValidPassword) {
      setError('password', {
        type: 'manual',
        message: (
          <ul style={{ margin: 0 }}>
            <li>Only alphanumeric characters allowed</li>
            <li>Minimum 8 characters allowed</li>
          </ul>
        ),
      })
    }

    return isValidUsername && isValidPassword
  }

  const login = (data) => {
    if (checkValidations(data)) {
      axios
        .post('http://localhost:5000/api/login', data)
        .then((res) => {
          sessionStorage.setItem('token', res.data.token)
          navigate('/details')
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
  }

  return (
    <div className="wrapper">
      <Paper elevation={4} className="container">
        <form className="formWrapper" onSubmit={handleSubmit(login)}>
          <h1>LOGIN</h1>
          <TextField
            // required
            label="Username"
            variant="outlined"
            {...register('username')}
            error={!!errors.username}
            helperText={errors?.username?.message ?? ''}
          />
          <TextField
            // required
            label="Password"
            variant="outlined"
            {...register('password')}
            error={!!errors.password}
            helperText={errors?.password?.message ?? ''}
            FormHelperTextProps={{ style: { marginLeft: 0 } }} // Remove margin
          />

          <Button variant="contained" type="submit" color="success">
            Login
          </Button>
          <div className="register-label">
            Don't have an account?
            <Link to="/register"> Create here</Link>
          </div>
        </form>
      </Paper>
    </div>
  )
}

export default App
