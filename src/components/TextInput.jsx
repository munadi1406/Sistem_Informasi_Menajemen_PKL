import { Input } from '@material-tailwind/react'
import PropTypes from 'prop-types'

export default function TextInput({type,label,...props}) {
  return (
    <div className='flex flex-col gap-2 w-full capitalize'>
      <Input type={type} label={label} size="lg" {...props} color='blue'/>
    </div>
  )
}
TextInput.propTypes = {
    type:PropTypes.string.isRequired,
    label:PropTypes.string.isRequired,
}
TextInput.defaultProps={
    type:"text"
}

