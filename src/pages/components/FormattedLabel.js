import React, { useEffect, useState } from 'react'

const FormattedLabel = ({ id, lang }) => {
  const [formattedLabel, setFormattedLabel] = useState('')
  const labels = {
    EN: {
      fullName: 'Name',
      username: 'Username',
      language: 'Language',
      mobileNumber: 'Mobile Number',
    },
    DE: {
      fullName: 'Name',
      username: 'Nutzername',
      language: 'Sprache',
      mobileNumber: 'Handynummer',
    },
  }

  useEffect(() => {
    findLabel()
  }, [id, lang])

  const findLabel = () => {
    setFormattedLabel(labels?.[lang]?.[id])
  }

  return <label>{formattedLabel}</label>
}

export default FormattedLabel
