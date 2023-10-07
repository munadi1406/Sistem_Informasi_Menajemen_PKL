import { Button } from '@material-tailwind/react'
import PropTypes from 'prop-types'

export default function ButtonCustom({ text, color = "blue",className, ...props }) {
    
    return (
        <Button color={color} className={`${className} capitalize`} {...props}>{text}</Button>
    )
}
ButtonCustom.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
    className: PropTypes.string,
}
