import React from 'react'
import '../../styles/User.css'
import moment from 'moment'
import axios from 'axios'
import sweetAlert from 'sweetalert'
import { Switch } from '@mui/material'

const Admin = ({ data, fetchDetailsFn }) => {
  const token = sessionStorage.getItem('token')

  const toggleActivation = (id) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/toggleActivation`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { id },
      })
      .then((res) => {
        sweetAlert('Success', res.data?.message, 'success')
        fetchDetailsFn()
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
  return (
    <div className="details-wrapper">
      <table>
        <tbody>
          <tr>
            <th style={{ minWidth: 50 }}>Sr No.</th>
            <th style={{ minWidth: 150 }}>Name</th>
            <th style={{ minWidth: 150 }}>Email</th>
            <th style={{ minWidth: 160 }}>Created Date</th>
            <th style={{ minWidth: 150 }}>Action</th>
          </tr>
          {data?.allUsers?.map((data, i, arr) => (
            <tr key={data?.id}>
              <td style={{ minWidth: 50 }}>{arr?.length - i}</td>
              <td style={{ minWidth: 150 }}>{data?.fullName}</td>
              <td style={{ minWidth: 150 }}>{data?.username}</td>
              <td style={{ minWidth: 160 }}>
                {moment(data?.createdAt).format('DD-MM-YYYY hh:mm A')}
              </td>
              <td style={{ minWidth: 150 }}>
                <Switch
                  checked={data?.activeFlag == 'Y'}
                  onClick={() => toggleActivation(data?.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Admin
