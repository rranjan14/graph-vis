import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CustomSnackBar = (props) => {
  return (
    <Snackbar
      open={props.open}
      autoHideDuration={4000}
      onClose={props.closeSnackBar}
    >
      <Alert onClose={props.closeSnackBar} severity={props.severity}>
        {props.message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackBar;
