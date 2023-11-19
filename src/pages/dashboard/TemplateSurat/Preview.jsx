import Index from "../../../components/templateSuratLayout/Index";
import PropTypes from "prop-types";
import WithContainerModal from "../../../utils/WithContainerModal";

const Preview = ({ TemplateById }) => {
  return (
    <Index
      isi={
        TemplateById.isLoading ? "Loading..." : TemplateById.data?.isi_template
      }
    />
  );
};

Preview.propTypes = {
  TemplateById: PropTypes.object,
};
export default WithContainerModal(Preview);
