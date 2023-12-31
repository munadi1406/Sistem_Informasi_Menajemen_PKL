import { endpoint } from "../../api/templateSertifkat";
import LazyImage from "../LazyImage";
import PropTypes from 'prop-types'
import { useContext } from "react";
import CurrentTemplate from "../../context/Context";

export default function Card({ data }) {
    const context = useContext(CurrentTemplate)
    const handleClick = () => {
        context.setValue(data)
        context.handleSetSertifikat()
    }
    return (
        <div
            className="rounded-md p-2 w-full h-full shadow-sm space-y-2 cursor-pointer transition-all ease-in-out duration-200  hover:scale-105  active:scale-95"
            onClick={handleClick}
        >
            <div className="flex justify-between items-start gap-2">
                <h2 className="font-semibold text-xl capitalize break-words w-2/3">
                    {data.name}
                </h2>

            </div>
            <div>
                <LazyImage
                    src={`${endpoint}/templateSertifikat/image/${data.template}`}
                    className="w-full h-auto rounded-md"
                    alt={name}

                />
            </div>
        </div>
    )
}
Card.propTypes = {
    data: PropTypes.object,
}