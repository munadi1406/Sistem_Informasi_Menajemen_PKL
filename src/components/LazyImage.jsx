import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


const LazyImage =  ({src,alt,...props})=>{
    return (

        <LazyLoadImage
    alt={alt}
    effect="blur"
    src={src} {...props}/>
    )
}

export default LazyImage