import withMT from "@material-tailwind/react/utils/withMT";
 
module.exports = withMT({
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],  
  theme: {
    extend: {},
  },
  plugins: [
    require('@material-tailwind/react'),
  ]
});