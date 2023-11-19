import PropTypes from "prop-types";
import { endpoint } from "../../../api/users";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import LazyImage from "../../../components/LazyImage";

export default function DataTemplateSertifikat({
  dataTemplate,
  handleOpenDelete,
  handleOpenEdit,
  handleOpenPreview,
}) {
  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2 px-2">
      {dataTemplate.map(({ data }) =>
        data.data.data.map((e, i) => (
          <div
            key={i}
            className="rounded-md p-2 w-full h-full shadow-sm space-y-2"
          >
            <div className="flex justify-between items-start gap-2">
              <h2 className="font-semibold text-xl capitalize break-words w-2/3">
                {e.name}
              </h2>
              <div className="flex justify-center gap-5 w-[100px] px-2 py-1 bg-white shadow-md rounded-md ">
                <div
                  className="hover:scale-90 cursor-pointer text-green-300"
                  onClick={() => handleOpenEdit(e.id)}
                >
                  <FaPencilAlt />
                </div>
                <div
                  className="hover:scale-90 cursor-pointer text-red-300"
                  onClick={() => handleOpenDelete(e.id, e)}
                >
                  <FaTrash />
                </div>
              </div>
            </div>
            <div>
              <LazyImage
                src={`${endpoint}/templateSertifikat/image/${e.template}`}
                className="w-full h-auto rounded-md"
                alt={e.name}
                onClick={() => handleOpenPreview(e.id)}
              />
            </div>
          </div>
        )),
      )}
    </div>
  );
}
DataTemplateSertifikat.propTypes = {
  dataTemplate: PropTypes.array,
  handleOpenDelete: PropTypes.func.isRequired,
  handleOpenPreview: PropTypes.func,
  handleOpenEdit: PropTypes.func.isRequired,
};
