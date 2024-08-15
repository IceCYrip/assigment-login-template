import React from 'react'
import '../styles/Register.css'
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@mui/material'

import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import validator from 'validator'
import axios from 'axios'
import sweetAlert from 'sweetalert'

const Register = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm()

  const checkValidations = (data) => {
    const isValidFullName = !!data?.fullName
    const isValidUsername = validator.isEmail(data.username)
    const isValidPassword =
      validator.isAlphanumeric(data.password) && data.password?.length >= 8
    const isValidConfirmPassword = data?.password === data?.confirmPassword
    const isValidLanguage = !!data?.language
    const isValidMobileNumber = !data?.mobileNumber
      ? true
      : validator.isNumeric(data?.mobileNumber) &&
        data?.mobileNumber?.length === 10

    if (!isValidFullName) {
      setError('fullName', {
        type: 'manual',
        message: 'Please enter a name',
      })
    }

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

    if (!isValidConfirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: 'Password does not match',
      })
    }

    if (!isValidLanguage) {
      setError('language', {
        type: 'manual',
        message: 'Please select a language',
      })
    }

    if (!isValidMobileNumber) {
      setError('mobileNumber', {
        type: 'manual',
        message: 'Invalide mobile number',
      })
    }

    return (
      isValidFullName &&
      isValidUsername &&
      isValidPassword &&
      isValidConfirmPassword &&
      isValidLanguage &&
      isValidMobileNumber
    )
  }

  const login = (data) => {
    if (checkValidations(data)) {
      console.log('data: ', data)
      axios
        .post('http://localhost:5000/api/register', data)
        .then((res) => {
          // sessionStorage.setItem('token', res.data.token)
          // navigate('/details')
          if (res.data?.mailSent) {
            sweetAlert('Verification', res.data?.message, 'info')
          }
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
        <form className="registerFormWrapper" onSubmit={handleSubmit(login)}>
          <h1>REGISTER</h1>
          <TextField
            // required
            label="Name"
            variant="outlined"
            {...register('fullName')}
            error={!!errors.fullName}
            helperText={errors?.fullName?.message ?? ''}
          />
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
            type="password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors?.password?.message ?? ''}
            FormHelperTextProps={{ style: { marginLeft: 0 } }} // Remove margin
          />
          <TextField
            // required
            label="Confirm Password"
            variant="outlined"
            type="password"
            {...register('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={errors?.confirmPassword?.message ?? ''}
          />
          <FormControl error={!!errors.language}>
            <InputLabel>Language</InputLabel>
            <Controller
              render={({ field }) => (
                <Select
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  label="Language"
                >
                  <MenuItem key={'EN'} value={'EN'}>
                    EN
                  </MenuItem>
                  <MenuItem key={'DE'} value={'DE'}>
                    DE
                  </MenuItem>
                </Select>
              )}
              name="language"
              control={control}
              defaultValue=""
            />
            <FormHelperText>{errors?.language?.message ?? ''}</FormHelperText>
          </FormControl>
          <TextField
            // required
            label="Mobile Number"
            variant="outlined"
            {...register('mobileNumber')}
            error={!!errors.mobileNumber}
            helperText={errors?.mobileNumber?.message ?? ''}
            FormHelperTextProps={{ style: { marginLeft: 0 } }} // Remove margin
          />

          <Button variant="contained" type="submit" color="success">
            Create an account
          </Button>
          <div className="register-label">
            Already have an account?
            <Link to="/"> Login</Link>
          </div>
        </form>
      </Paper>
    </div>
  )
}

export default Register
