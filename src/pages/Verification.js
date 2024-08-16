import React from 'react'
import '../styles/Verification.css'
import { Button, Paper } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'

const Verification = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const successfullyVerified = searchParams.get('successfullyVerified') == 'Y'
  const alreadyVerified = searchParams.get('alreadyVerified') == 'Y'

  return (
    <div className="wrapper">
      <Paper elevation={4} className="verification-container">
        <div className="verification-msg">
          <h1 style={{ textAlign: 'center' }}>Verification Done</h1>
          <p>
            {successfullyVerified &&
              !alreadyVerified &&
              'Your account has been successfully verified.'}
            {alreadyVerified && 'Your account is already verified.'}
          </p>
        </div>
      </Paper>
      <Button
        className="logout"
        color="info"
        variant="contained"
        onClick={() => navigate('/')}
      >
        Go to Login
      </Button>
    </div>
  )
}

export default Verification
