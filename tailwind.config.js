/** @type {import('tailwindcss').Config} */
import  withMT  from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'Nunito': ['CustomFont', 'system-ui', 'sans'],
        'AnandaBlackPersonalUseRegular': ['AnandaBlackPersonalUseRegular', 'sans-serif'],
        'AspireDemibold': ['AspireDemibold', 'sans-serif'],
        'AutumnFlowers': ['AutumnFlowers', 'sans-serif'],
        'Calligrapher': ['Calligrapher', 'sans-serif'],
        'ChicanosPersonalUseRegular': ['ChicanosPersonalUseRegular', 'sans-serif'],
        'DoveOfPeacePersonalUse': ['DoveOfPeacePersonalUse', 'sans-serif'],
        'EmotionalRescuePersonalUseRegular': ['EmotionalRescuePersonalUseRegular', 'sans-serif'],
        'FeelfreePersonalUseRegular': ['FeelfreePersonalUseRegular', 'sans-serif'],
        'GeraldinePersonalUseItalic': ['GeraldinePersonalUseItalic', 'sans-serif'],
        'IndentureEnglishPenmanDemo': ['IndentureEnglishPenmanDemo', 'sans-serif'],
        'LambencyRegular': ['LambencyRegular', 'sans-serif'],
        'MutalisFashionPersonalUseRegular': ['MutalisFashionPersonalUseRegular', 'sans-serif'],
        'NatureBeautyPersonalUse': ['NatureBeautyPersonalUse', 'sans-serif'],
        'SellenaBrush': ['SellenaBrush', 'sans-serif'],
        'StylishCalligraphyDemo': ['StylishCalligraphyDemo', 'sans-serif'],
        'SweetHipster': ['SweetHipster', 'sans-serif'],
        'TheCheese': ['TheCheese', 'sans-serif'],
        'WeddingdayPersonalUseRegular': ['WeddingdayPersonalUseRegular', 'sans-serif'],
      },
    },
  },
  plugins: [],
});
