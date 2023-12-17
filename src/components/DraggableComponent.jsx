import Draggable from "react-draggable";

export default function DraggableComponent({ children, ...props }) {
  return (
    <Draggable bounds="parent" {...props}>
      {children}
    </Draggable>
  );
}
