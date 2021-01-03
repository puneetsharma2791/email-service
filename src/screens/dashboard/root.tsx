import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import {
  AppBar,
  Grid,
  Paper,
  ThemeProvider,
  ListItemSecondaryAction,
  Chip,
  InputBase,
  TableBody,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  Checkbox,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import DeleteIcon from "@material-ui/icons/Delete";
import SendIcon from "@material-ui/icons/Send";
import GradeIcon from "@material-ui/icons/Grade";
import DraftsIcon from "@material-ui/icons/Drafts";
import LabelIcon from "@material-ui/icons/LocalOfferOutlined";
import SearchIcon from "@material-ui/icons/Search";
import CachedIcon from "@material-ui/icons/Cached";
import VisibilityIcon from "@material-ui/icons/Visibility";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import AccountCircleRounded from "@material-ui/icons/AccountCircleRounded";
import ViewMail from "./molecules/viewMail";
import ComposeMail from "./molecules/compose";
import { createMuiTheme } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  removeLoggedInUserId,
  selectLoggedInUser,
} from "../../store/slices/userSlice";
import { Mail, User } from "../../store/models/user";
import { useHistory } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "white",
    color: "black",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  menuButton: {
    marginRight: 36,
    backgroundColor: "#1db494",
    color: "white",
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    backgroundColor: "#2f3f51",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  composeMail: {
    width: "100%",
    margin: "2%",
    padding: "6px",
  },
  label: {
    textTransform: "capitalize",
    fontSize: "18px",
    fontWeight: "bold",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    background: "#f3f3f4",
    padding: theme.spacing(3),
  },
}));

export default function DashBoard() {
  const [openViewMail, setOpenViewMail] = React.useState(false);
  const [openComposeMail, setOpenComposeMail] = React.useState(false);
  const [mailMenu, setMailMenu] = React.useState("inbox");
  const loggedInUser: User = useSelector(selectLoggedInUser);
  let dispatch = useDispatch();
  let history = useHistory();
  useEffect(() => {
    debugger;
    if (!loggedInUser.userId) {
      history.push("/login");
    }
  }, [loggedInUser]);

  const handleCloseComposeMail = () => {
    setOpenComposeMail(false);
  };
  const handleClickOpenComposeMail = () => {
    setOpenComposeMail(true);
  };
  const [selectedMail, setSelectedMail] = React.useState({});
  const handleClickOpenViewMail = () => {
    setOpenViewMail(true);
  };

  const handleCloseViewMail = () => {
    setOpenViewMail(false);
  };

  const [selected, setSelected] = React.useState<string[]>([]);
  const handleClick = (_event: any, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };
  const isSelected = (name: string) => selected.indexOf(name) !== -1;
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#1db494",
        contrastText: "#fff",
      },
      secondary: {
        main: "#ff6d00",
      },
    },
  });
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <ViewMail
        open={openViewMail}
        mail={selectedMail}
        handleClose={handleCloseViewMail}
      ></ViewMail>
      <ComposeMail
        open={openComposeMail}
        handleClose={handleCloseComposeMail}
        mail={{ from: loggedInUser?.userId }}
      ></ComposeMail>
      <div className={classes.root}>
        <CssBaseline />

        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <Typography
              variant="h6"
              noWrap
              className={clsx({
                [classes.hide]: !open,
              })}
            >
              {loggedInUser.firstName + " " + loggedInUser.lastName}
            </Typography>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <AccountCircleRounded />
              ) : (
                <AccountCircleRounded />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {["Mails", "Starred", "Coming Soon", "Coming Soon"].map(
              (text, index) => (
                <ListItem
                  selected={text === "Mails" ? true : false}
                  button
                  key={text}
                >
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              )
            )}
          </List>
          <Divider />
          <List>
            {["Coming Soon", "Coming Soon"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper>
              <div style={{ height: "12%", width: "100%" }}>
                <AppBar position="relative" className={clsx(classes.appBar)}>
                  <Toolbar>
                    <Grid item xs={10}>
                      <Button
                        aria-label="open drawer"
                        onClick={open ? handleDrawerClose : handleDrawerOpen}
                        variant="contained"
                        color="primary"
                      >
                        <MenuIcon />
                      </Button>
                      <Typography
                        style={{ marginLeft: "5px", display: "inline-block" }}
                        variant="h6"
                      >
                        Search Something Here ......
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Button
                        color="default"
                        variant="contained"
                        onClick={() => {
                          dispatch(removeLoggedInUserId({}));
                        }}
                      >
                        {" "}
                        LOG OUT
                      </Button>
                    </Grid>
                  </Toolbar>
                </AppBar>
              </div>
            </Paper>
          </Grid>

          <Grid container spacing={3} className={classes.content}>
            <Grid item xs={3}>
              <Grid container>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleClickOpenComposeMail();
                  }}
                  classes={{
                    root: classes.composeMail,
                    label: classes.label, // class name, e.g. `classes-nesting-label-x`
                  }}
                >
                  Compose Mail
                </Button>
              </Grid>
              <Grid container spacing={3} className={classes.content}>
                <Grid item xs={12}>
                  <Typography variant="body1">FOLDER</Typography>
                  <List dense={true}>
                    <ListItem
                      selected={mailMenu === "inbox"}
                      onClick={() => {
                        setMailMenu("inbox");
                      }}
                    >
                      <ListItemIcon>
                        <InboxIcon />
                      </ListItemIcon>
                      <ListItemText primary="Inbox" />
                      <ListItemSecondaryAction>
                        <Chip
                          color="primary"
                          label={
                            loggedInUser.inbox ? loggedInUser.inbox.length : 0
                          }
                          size="small"
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                    <ListItem
                      selected={mailMenu === "sent"}
                      onClick={() => {
                        setMailMenu("sent");
                      }}
                    >
                      <ListItemIcon>
                        <SendIcon />
                      </ListItemIcon>
                      <ListItemText primary="Send Mail" />
                      <ListItemSecondaryAction>
                        <Chip
                          color="primary"
                          label={
                            loggedInUser.sent ? loggedInUser.sent.length : 0
                          }
                          size="small"
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemIcon>
                        <GradeIcon />
                      </ListItemIcon>
                      <ListItemText primary="Important" />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemIcon>
                        <DraftsIcon />
                      </ListItemIcon>
                      <ListItemText primary="Drafts" />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemIcon>
                        <DeleteIcon />
                      </ListItemIcon>
                      <ListItemText primary="Trash" />
                    </ListItem>
                    <Divider />
                  </List>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">CATEGORIES</Typography>
                  <List dense={true}>
                    <ListItem>
                      <ListItemIcon>
                        <FiberManualRecordIcon />
                      </ListItemIcon>
                      <ListItemText primary="Work" />
                      <ListItemSecondaryAction>
                        <Chip color="primary" label="12" size="small" />
                      </ListItemSecondaryAction>
                    </ListItem>

                    <Divider />
                    <ListItem>
                      <ListItemIcon>
                        <FiberManualRecordIcon color="error" />
                      </ListItemIcon>
                      <ListItemText primary="Interview" />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemIcon>
                        <FiberManualRecordIcon color="secondary" />
                      </ListItemIcon>
                      <ListItemText primary="Tutorials" />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemIcon>
                        <FiberManualRecordIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Spam" />
                    </ListItem>
                    <Divider />
                  </List>
                </Grid>
                <Grid item xs={12} spacing={3}>
                  <Typography variant="body1">LABELS</Typography>
                  <Button
                    style={{ margin: "5px", backgroundColor: "white" }}
                    variant="outlined"
                  >
                    <LabelIcon style={{ marginRight: "8px" }}></LabelIcon>
                    Work
                  </Button>
                  <Button
                    style={{ margin: "5px", backgroundColor: "white" }}
                    variant="outlined"
                  >
                    <LabelIcon style={{ marginRight: "8px" }}></LabelIcon>
                    Home
                  </Button>
                  <Button
                    style={{ margin: "5px", backgroundColor: "white" }}
                    variant="outlined"
                  >
                    <LabelIcon style={{ marginRight: "8px" }}></LabelIcon>
                    Family
                  </Button>
                  <Button
                    style={{ margin: "5px", backgroundColor: "white" }}
                    variant="outlined"
                  >
                    <LabelIcon style={{ marginRight: "8px" }}></LabelIcon>
                    Children
                  </Button>
                  <Button
                    style={{ margin: "5px", backgroundColor: "white" }}
                    variant="outlined"
                  >
                    <LabelIcon style={{ marginRight: "8px" }}></LabelIcon>
                    Holiday
                  </Button>
                  <Button
                    style={{ margin: "5px", backgroundColor: "white" }}
                    variant="outlined"
                  >
                    <LabelIcon style={{ marginRight: "8px" }}></LabelIcon>
                    Bank
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={9}>
              <Paper className={classes.paper}>
                {" "}
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                      spacing={3}
                    >
                      <Grid item xs={2}>
                        {mailMenu === `inbox` && (
                          <Typography variant="h5">
                            inbox (
                            {loggedInUser.inbox ? loggedInUser.inbox.length : 0}
                            )
                          </Typography>
                        )}
                        {mailMenu === `sent` && (
                          <Typography variant="h5">
                            sent (
                            {loggedInUser.sent ? loggedInUser.sent.length : 0})
                          </Typography>
                        )}
                      </Grid>
                      <Grid item xs={4}>
                        <InputBase
                          className={classes.input}
                          placeholder="Search.."
                          inputProps={{ "aria-label": "search" }}
                        />
                        <IconButton
                          type="submit"
                          className={classes.iconButton}
                          aria-label="search"
                        >
                          <SearchIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                      spacing={3}
                    >
                      <Grid item xs={6}>
                        <Button variant="outlined" startIcon={<CachedIcon />}>
                          Refresh
                        </Button>
                        <Button
                          style={{ marginLeft: "4px" }}
                          variant="outlined"
                          aria-label="view"
                        >
                          <VisibilityIcon />
                        </Button>
                        <Button
                          style={{ marginLeft: "4px" }}
                          variant="outlined"
                          aria-label="view"
                        >
                          <PriorityHighIcon />
                        </Button>
                        <Button
                          style={{ marginLeft: "4px" }}
                          variant="outlined"
                          aria-label="view"
                        >
                          <DeleteIcon />
                        </Button>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                      style={{ marginTop: "15px" }}
                      spacing={3}
                    >
                      <TableContainer>
                        <Table
                          aria-labelledby="tableTitle"
                          aria-label="enhanced table"
                        >
                          <TableBody>
                            {mailMenu === `sent` && loggedInUser.sent
                              ? loggedInUser.sent?.map((row: Mail) => {
                                  let isItemSelected = isSelected(row.id);
                                  return (
                                    <TableRow
                                      hover
                                      role="checkbox"
                                      aria-checked={isItemSelected}
                                      tabIndex={-1}
                                      key={row.id}
                                      onClick={() => {
                                        setSelectedMail(row);
                                        handleClickOpenViewMail();
                                      }}
                                      selected={isItemSelected}
                                    >
                                      <TableCell
                                        onClick={(event) =>
                                          handleClick(event, row.id)
                                        }
                                        padding="checkbox"
                                      >
                                        <Checkbox
                                          checked={isItemSelected}
                                          inputProps={{
                                            "aria-labelledby": row.id,
                                          }}
                                        />
                                      </TableCell>
                                      <TableCell
                                        component="th"
                                        id={row.id}
                                        scope="row"
                                        padding="none"
                                      >
                                        {row.from}
                                      </TableCell>

                                      <TableCell align="center">
                                        {row.message}
                                      </TableCell>
                                      <TableCell align="right">
                                        {row.date}
                                      </TableCell>
                                    </TableRow>
                                  );
                                })
                              : mailMenu === `sent` && (
                                  <TableRow>
                                    <Alert
                                      style={{ padding: "20px", margin: "10%" }}
                                      severity="success"
                                      color="info"
                                    >
                                      <Typography variant="h6">
                                        Welcome to SAHAJ email service.. There
                                        are no Emails for You !!
                                      </Typography>
                                    </Alert>
                                  </TableRow>
                                )}
                            {mailMenu === `inbox` && loggedInUser.inbox
                              ? loggedInUser.inbox?.map((row: Mail) => {
                                  let isItemSelected = isSelected(row.id);
                                  return (
                                    <TableRow
                                      hover
                                      role="checkbox"
                                      aria-checked={isItemSelected}
                                      tabIndex={-1}
                                      key={row.id}
                                      onClick={() => {
                                        setSelectedMail(row);
                                        handleClickOpenViewMail();
                                      }}
                                      selected={isItemSelected}
                                    >
                                      <TableCell
                                        onClick={(event) =>
                                          handleClick(event, row.id)
                                        }
                                        padding="checkbox"
                                      >
                                        <Checkbox
                                          checked={isItemSelected}
                                          inputProps={{
                                            "aria-labelledby": row.id,
                                          }}
                                        />
                                      </TableCell>
                                      <TableCell
                                        component="th"
                                        id={row.id}
                                        scope="row"
                                        padding="none"
                                      >
                                        {row.from}
                                      </TableCell>

                                      <TableCell align="center">
                                        {row.message}
                                      </TableCell>
                                      <TableCell align="right">
                                        {row.date}
                                      </TableCell>
                                    </TableRow>
                                  );
                                })
                              : mailMenu === `inbox` && (
                                  <TableRow>
                                    <Alert
                                      style={{ padding: "20px", margin: "10%" }}
                                      severity="success"
                                      color="info"
                                    >
                                      <Typography variant="h6">
                                        Welcome to SAHAJ email service.. There
                                        are no Emails for You !!
                                      </Typography>
                                    </Alert>
                                  </TableRow>
                                )}{" "}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}
