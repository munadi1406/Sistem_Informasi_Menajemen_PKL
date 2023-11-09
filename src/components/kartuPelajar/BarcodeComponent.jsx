import Barcode from 'react-barcode'
import PropTypes from 'prop-types'


export default function BarcodeComponent({value}){
    return(
        <Barcode value={value}  displayValue={false} height={15} width={0.5}  />
    )
}
BarcodeComponent.propTypes={
    value:PropTypes.string.isRequired,
}