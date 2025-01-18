/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", 
    

  "./src/pages/**/*.{js,ts,jsx,tsx}",
  "./src/components/**/*.{js,ts,jsx,tsx}",


  "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      black_first: "#232323",
      black_second: "#444444",
      blue_first: "#315FB7",
      red_first: "#AF2626",
      red_second: "#D24949",  /* rgba(210, 73, 73, 1) */ 
      red_third: "#FFE9E9",
      gray_first: "#C6C6C6",
      gray_second: "#F8F8F8",
      gray_third: "#616673",
      body_news: "#F7FAFA",
      text_news: "#716363",
      whited: "#fff"
    },

    extend: {
      boxShadow: {
        'flags-shadow': '0 0 8px 0 rgba(0, 0, 0, 0.2)', // Add your custom shadow here
      },
    },
  },
  plugins: [],
};
