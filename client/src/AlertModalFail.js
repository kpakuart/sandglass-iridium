
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function AlertModalFail(props) {
  //const [open, setOpen] = React.useState(false);
  
  return (
    <div>

      <Dialog
        open={props.openFail}
        onClose={props.handleCloseFail}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Mint Failed"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Something went wrong with your mint!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleCloseFail}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

