import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    loginBox: {
      marginTop: "20%"
    },
    // background: {
    //     backgroundImage:  `url(${pic})`
    // }
  }));

export default useStyles