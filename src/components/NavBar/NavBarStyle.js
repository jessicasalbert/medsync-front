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
    navMargin: {
      marginBottom: '30px'
    },
    logo: {
        padding: "10px",
        marginRight: "2%"
    }
  }));

export default useStyles