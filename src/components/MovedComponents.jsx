import  { useState, useEffect } from "react";
import { useMoveComponent } from "../store/store";

const MovedComponents = ({
  children,
  type,
}) => {
  const [isMove, setIsMove] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const { setX, setY, setXKepsek, setYKepsek, setYKepel, setXKepel } =
    useMoveComponent();
  const { y, x, xKepel, yKepel, xKepsek, yKepsek,xQrCode,setXQrCode,yQrCode,setYQrCode } = useMoveComponent(
    (state) => state,
  );

  const handleMouseDown = (e) => {
    setIsMove(true);
    if (type === "kepsek") {
      setStartPosition({
        x: e.clientX - xKepsek,
        y: e.clientY - yKepsek,
      });
    } else if (type === "kepel") {
      setStartPosition({
        x: e.clientX - xKepel,
        y: e.clientY - yKepel,
      });
    } else if(type === 'qrCode'){
      setStartPosition({
        x: e.clientX - xQrCode,
        y: e.clientY - yQrCode,
      });
    }
      else {
      setStartPosition({
        x: e.clientX - x,
        y: e.clientY - y,
      });
    }
    document.body.style.userSelect = "none";
   
  };

  const handleMouseUp = () => {
    setIsMove(false);
    document.body.style.userSelect = "auto";
  
  };

  const handleMouseMove = (e) => {
    

    if (isMove) {
      if (type === "kepsek") {
        setXKepsek(e.clientX - startPosition.x);
        setYKepsek(e.clientY - startPosition.y);
      } else if (type === "kepel") {
        setXKepel(e.clientX - startPosition.x);
        setYKepel(e.clientY - startPosition.y);
      } else if(type === 'qrCode'){
        setXQrCode(e.clientX - startPosition.x);
        setYQrCode(e.clientY - startPosition.y);
      }else {
        setX(e.clientX - startPosition.x);
        setY(e.clientY - startPosition.y);
      }
    }
  };
  useEffect(() => {
    return () => {
      document.body.style.userSelect = "auto";
    };
  }, []);
  const getX = () => (type === "kepsek" ? xKepsek : type === "kepel" ? xKepel  : type === 'qrCode' ? xQrCode : x);
  const getY = () => (type === "kepsek" ? yKepsek : type === "kepel" ? yKepel : type === 'qrCode' ? yQrCode : y);

  const inlineStyles = {
    transform: `translate(${getX()}px, ${getY()}px)`,
    cursor: isMove ? "grabbing" : "grab",
    border: isMove ? "1px dashed green" : "none",
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      onTouchMove={handleMouseMove}
      style={inlineStyles}
      className={"w-max absolute "}
    >
      {children}
    </div>
  );
};

export default MovedComponents;
