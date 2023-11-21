import { QRCodeSVG } from "qrcode.react";
import Logo from "../assets/logosma1.png";
import PropTypes from 'prop-types'

export default function QrCode({value,size}) {
  return (
    <QRCodeSVG
      value={value}
      size={size}
    />
  );
}
QrCode.propTypes={
  value:PropTypes.string,
  size:PropTypes.number
}
QrCode.defaultProp={
  size:100
}
