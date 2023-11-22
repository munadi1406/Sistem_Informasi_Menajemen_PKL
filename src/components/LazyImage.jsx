import LazyLoad from "react-lazy-load";

const LazyImage = ({ src, alt, ...props }) => {
  return (
    <LazyLoad>
      <img src={src} alt={alt} {...props} />
    </LazyLoad>
  );
};

export default LazyImage;
