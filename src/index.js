import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './redux/rootReducer'
import { BrowserRouter } from 'react-router-dom'

const theme = createMuiTheme({
  palette : {
    primary: {
      main: "#81ffe6"
    },
    secondary: {
      main: "#DDDDDD"
    }
  },
  typography: {
    fontFamily : 'Montserrat',
    h6: {
      fontSize: "3em"
    }
  }
  
})


const store = createStore(rootReducer)


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
