import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { Typography, TextField, Grid, FormControl } from "@material-ui/core/";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Mail } from "../../../store/models/user";
import { useDispatch } from "react-redux";
import { addInboxEmail, addSentEmail } from "../../../store/slices/userSlice";

export default function ComposeMail(props: any) {
  const [mail, setMail] = useState<Mail>();
  let dispatch = useDispatch();
  const handleChange = (field: string, value: any) => {
    setMail((preValue: Mail | undefined) => {
      if (!preValue) {
        preValue = new Mail();
      }
      return { ...preValue, ...{ [field]: value } };
    });
  };
  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth="lg"
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Email</DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <b>From:</b> {props.mail.from}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                {" "}
                <TextField
                  id="standard-textarea"
                  label="To"
                  placeholder="xyz.ewr@ccsw.in"
                  value={mail?.to?.join(", ")}
                  onChange={(event) => {
                    handleChange(
                      "to",
                      event.target.value.split(",").map((entry) => entry.trim())
                    );
                  }}
                  multiline
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  id="standard-textarea"
                  label="CC"
                  value={mail?.cc?.join(", ")}
                  onChange={(event) => {
                    handleChange(
                      "cc",
                      event.target.value.split(",").map((entry) => entry.trim())
                    );
                  }}
                  placeholder="xyz.ewr@ccsw.in"
                  multiline
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  id="standard-textarea"
                  label="subject"
                  value={mail?.subject}
                  onChange={(event) => {
                    handleChange("subject", event.target.value);
                  }}
                  placeholder="congratulation"
                  multiline
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-multiline-static"
                  label="Message"
                  multiline
                  value={mail?.message}
                  onChange={(event) => {
                    handleChange("message", event.target.value);
                  }}
                  rows={40}
                  defaultValue="Default Value"
                  variant="outlined"
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={(e) => {
              const newMailObject = {
                ...mail,
                ...{ from: props.mail.from, date: new Date() },
              };
              dispatch(
                addSentEmail({ userId: props.mail.from, mail: newMailObject })
              );
              mail?.to?.forEach((toAddress: string) => {
                dispatch(
                  addInboxEmail({ userId: toAddress, mail: newMailObject })
                );
              });
              mail?.cc?.forEach((toAddress: string) => {
                dispatch(
                  addInboxEmail({ userId: toAddress, mail: newMailObject })
                );
              });
              props.handleClose(e);
            }}
            color="primary"
          >
            Send
          </Button>
          <Button onClick={props.handleClose} color="primary">
            Discard
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
