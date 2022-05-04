
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function AlertModal(props) { 
  return (
    <div>

      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Mint Successful"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your mint has completed! Go to <a href="https://nftrade.com/assets/avalanche/0x36adfabdbd6a2ff9f1f2504f6b9550def44a61c4" target="_blank" rel="noreferrer">NFTrad</a> to view the collectionn
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

