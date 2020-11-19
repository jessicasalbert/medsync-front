import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette : {
      primary: {
        main: "#81ffe6"
      },
      secondary: {
        main: "#C0C0C0"
      }
    },
    typography: {
      fontFamily : 'Montserrat',
      h6: {
        fontSize: "3em"
      }
    }
    
  })


export default theme