import React, { useEffect } from 'react'

function Alert({ type, message, removeAlert, item }) {

  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000)
    return () => clearTimeout(timeout);
  })

  return (
    <p className={`alert alert-${type}`}>{message}</p>
  )
}

export default Alert

