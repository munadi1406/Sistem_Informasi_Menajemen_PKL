import { QRCodeSVG } from "qrcode.react";
import Logo from "../assets/logosma1.png";

export default function QrCode() {
  return (
    <QRCodeSVG
      value="testing"
      imageSettings={{
        src: Logo,
        width: 24,
        height: 24,
        excavate: true,
      }}
    />
  );
}
