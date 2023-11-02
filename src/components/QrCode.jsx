import { QRCodeSVG } from "qrcode.react";
import Logo from "../assets/logosma1.png";
import PropTypes from 'prop-types'

export default function QrCode({value}) {
  return (
    <QRCodeSVG
      value={value}
      
      size="100"
    />
  );
}
QrCode.propTypes={
  value:PropTypes.string
}
