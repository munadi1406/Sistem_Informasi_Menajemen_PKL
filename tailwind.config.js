/** @type {import('tailwindcss').Config} */
import  withMT  from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'Nunito': ['CustomFont', 'system-ui', 'sans'],
      },
    },
  },
  plugins: [],
});
