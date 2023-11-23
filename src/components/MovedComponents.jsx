import  { useState, useEffect } from "react";
import { useMoveComponent } from "../store/store";

const MovedComponents = ({ children, type }) => {
  const [isMove, setIsMove] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const {
    setX,
    setY,
    setXKepsek,
    setYKepsek,
    setYKepel,
    setXKepel,
  } = useMoveComponent();
  const {
    y,
    x,
    xKepel,
    yKepel,
    xKepsek,
    yKepsek,
    xQrCode,
    setXQrCode,
    yQrCode,
    setYQrCode,
  } = useMoveComponent((state) => state);

  const handleMouseDown = (e) => {
    setIsMove(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setStartPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    document.body.style.userSelect = "none";
  };

  const handleMouseUp = () => {
    setIsMove(false);
    document.body.style.userSelect = "auto";
  };

  const handleMouseMove = (e) => {
    if (isMove) {
      const offsetX = e.clientX - startPosition.x;
      const offsetY = e.clientY - startPosition.y;

      if (type === "kepsek") {
        setXKepsek(offsetX);
        setYKepsek(offsetY);
      } else if (type === "kepel") {
        setXKepel(offsetX);
        setYKepel(offsetY);
      } else if (type === 'qrCode') {
        setXQrCode(offsetX);
        setYQrCode(offsetY);
      } else {
        setX(offsetX);
        setY(offsetY);
      }
    }
  };

  useEffect(() => {
    return () => {
      document.body.style.userSelect = "auto";
    };
  }, []);

  const getX = () => (type === "kepsek" ? xKepsek : type === "kepel" ? xKepel : type === 'qrCode' ? xQrCode : x);
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
      onMouseLeave={()=>setIsMove(false)}
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
