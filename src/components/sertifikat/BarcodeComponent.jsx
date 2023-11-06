import Barcode from 'react-barcode'
import PropTypes from 'prop-types'


export default function BarcodeComponent({value,color,isLight}){
    return(
        <Barcode value={value} fontSize={10} displayValue={false} height={40} width={2} background={color} lineColor={isLight ? "black" : "white"}/>
    )
}
BarcodeComponent.propTypes={
    value:PropTypes.string.isRequired,
}