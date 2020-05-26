import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    setOpen(props.visible)
  }, [props.visible])

  const handleClose = () => {
    setOpen(false)
    if(props.handleCancel) {
      props.handleCancel()
    }
  }

  const handleContinue = () => {
    setOpen(false)
    if(props.handleContinue) {
      props.handleContinue()
    }
  }

  return (
    <div>
      <Dialog {...props.nativeProps}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          {props.children}
        </DialogContent>
        <DialogActions>
          {
            !props.noActionBtns ? 
              props.actions ? props.actions
              :
                [
                  <Button key='dialogcancel' onClick={handleClose} color="primary">
                    Cancel
                  </Button>,
                  <Button key='dialogcontinue' onClick={handleContinue} color="primary" autoFocus>
                    Continue
                  </Button>
                ]
            : null
          }
        </DialogActions>
      </Dialog>
    </div>
  );
}
