import ContentEditable from "react-contenteditable";

export default function EditContent({ value, ...props }) {
  return <ContentEditable html={value} {...props} tagName="p" />;
}
