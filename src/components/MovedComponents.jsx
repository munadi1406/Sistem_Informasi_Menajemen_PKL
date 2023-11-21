import React, { useState, useEffect } from "react";

const MovedComponents = ({
  onMoveStart,
  onMoveEnd,
  onMove,
  initialPosition,
  children,
}) => {
  const [isMove, setIsMove] = useState(false);
  const [position, setPosition] = useState(initialPosition || { x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsMove(true);
    setStartPosition({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    document.body.style.userSelect = "none";
    onMoveStart && onMoveStart();
  };

  const handleMouseUp = () => {
    setIsMove(false);
    document.body.style.userSelect = "auto";
    onMoveEnd && onMoveEnd();
  };

  const handleMouseMove = (e) => {
    if (isMove) {
      setPosition({
        x: e.clientX - startPosition.x,
        y: e.clientY - startPosition.y,
      });
      onMove && onMove(position);
    }
  };

  useEffect(() => {
    return () => {
      document.body.style.userSelect = "auto";
    };
  }, []);

  const inlineStyles = {
    transform: `translate(${position.x}px, ${position.y}px)`,
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
