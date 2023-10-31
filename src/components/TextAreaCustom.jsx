import { Textarea } from "@material-tailwind/react";
import PropTypes from "prop-types";

export default function TextAreaCustom({ label, color, ...props }) {
  return (
    <div className="flex flex-col gap-2 w-full capitalize">
      <Textarea
        variant="outlined"
        label={label}
        required
        {...props}
        color={color}
      />
    </div>
  );
}
TextAreaCustom.propTypes = {
  color: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
TextAreaCustom.defaultProps = {
  type: "text",
  color: "blue",
};
