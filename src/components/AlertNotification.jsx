import { Typography } from '@material-tailwind/react'
import { Alert } from '@material-tailwind/react'
import { FaCheckCircle } from 'react-icons/fa'
import { GiCancel } from 'react-icons/gi'
import PropTypes from 'prop-types'

export default function AlertNotification({ open, status, msg }) {
  return (
    <Alert
      open={open}
      className="max-w-screen-md flex justify-start items-start"
      icon={status ? <FaCheckCircle size={30} color='white'/> : <GiCancel className="text-white" size={30} />}
      color={status ? "green" : 'red'}
    >
      <Typography variant="h5" color="white">
        {status ? "Success" : "Error"}
      </Typography>
      <Typography color="white" className="mt-2 font-normal">
        {msg}
      </Typography>
    </Alert>
  )
}
AlertNotification.propTypes = {
  open: PropTypes.bool.isRequired,
  status: PropTypes.bool.isRequired,
  msg: PropTypes.string.isRequired,
}
