import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { Typography } from "@material-ui/core/";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function ViewMail(props: any) {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Email</DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <b>From:</b> {props.mail.from}
          </Typography>
          <Typography gutterBottom>
            <b>To:</b> {props.mail.to}
          </Typography>{" "}
          <Typography gutterBottom>
            <b>Message:</b> {props.mail.message}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
