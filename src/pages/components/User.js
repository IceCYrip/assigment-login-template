import React, { useEffect, useState } from 'react'
import FormattedLabel from './FormattedLabel'
import '../../styles/User.css'

const User = ({ data }) => {
  const [dataHeads, setDataHeads] = useState([])
  useEffect(() => {
    !!data?.user && setDataHeads(Object.keys(data?.user))
  }, [data])

  return (
    <>
      <table>
        <tbody>
          {dataHeads?.map((objectKey, i) => (
            <tr key={i}>
              <th>
                <FormattedLabel id={objectKey} lang={data?.user?.language} />
              </th>
              <td>
                <p>{data?.user?.[objectKey]}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default User
