
import { Card as Cards, CardHeader, CardFooter, CardBody } from '@material-tailwind/react'
import PropTypes from 'prop-types'

const Card = ({ header, body, footer }) => {
    return (
        <Cards className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                {header}
            </CardHeader>
            <CardBody className="overflow-auto px-0">
                {body}
            </CardBody>
            {footer && (
                <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                    {footer}
                </CardFooter>
            )}
        </Cards>
    )
}
Card.propTypes = {
    header: PropTypes.node,
    body: PropTypes.node,
    footer: PropTypes.node
}
export default Card