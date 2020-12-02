import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      width: "200px"
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    card: {
        margin: "5px",
        height: "300px"  
    },
    image: {
        width: "120px"
    }
  }));

export default useStyles