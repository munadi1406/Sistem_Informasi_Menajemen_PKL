import { QRCodeSVG } from "qrcode.react";
import Logo from "../assets/logosma1.png";
import PropTypes from 'prop-types'

export default function QrCode({value}) {
  return (
    <QRCodeSVG
      value={value}
      imageSettings={{
        src: Logo,
        width: 24,
        height: 24,
        excavate: true,
      }}
      size="100"
    />
  );
}
QrCode.propTypes={
  value:PropTypes.string
}
