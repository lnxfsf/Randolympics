import { createTheme } from '@mui/material/styles';



const theme = createTheme({
    palette: {
      primary: { main: '#FFEAEA', },
      secondary: { main: '#c9dde9' },
      
    
    },
    typography:{
        fontFamily: [
            'Roboto',
            '-apple-system',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),
    }
  });

  export default theme;

