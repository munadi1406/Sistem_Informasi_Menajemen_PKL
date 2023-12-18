import LazyLoad from "react-lazy-load";
import { useMemo } from "react";

const LazyImage = ({ src, alt, ...props }) => {
  const lazyImage = useMemo(() => {
    return (
      <LazyLoad>
        <img src={src} alt={alt} {...props} />
      </LazyLoad>
    );
  }, [src, alt, props]);

  return lazyImage;
};

export default LazyImage;

