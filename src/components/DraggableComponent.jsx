import { useMemo } from 'react';
import Draggable from 'react-draggable';

const DraggableComponent = ({ children, ...props }) => {
  const memoizedComponent = useMemo(() => (
    <Draggable bounds="parent" {...props}>
      {children}
    </Draggable>
  ), [children, props]);

  return memoizedComponent;
};

export default DraggableComponent;
