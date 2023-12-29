import PropTypes from 'prop-types'
const CardStatistik = ({ title, count, bgColor, textColor }) => {
    return (
        <div className={`flex pt-2 rounded-md ${bgColor} justify-center  h-44`}>
            <div className={`h-full w-full flex border flex-col justify-center items-center bg-white ${textColor}`}>
                <div className='text-3xl text-center font-bold'>{count}</div>
                <p className='text-xs text-start'>{title}</p>
            </div>
        </div>
    )
}

CardStatistik.propTypes = {
    title: PropTypes.string.isRequired,
    count: PropTypes.number,
    bgColor: PropTypes.string,
    textColor: PropTypes.string,
}
CardStatistik.defaultProps = {
    bgColor: "bg-color-300",
    textColor: "text-blue-300",
    count:0
}
export default CardStatistik