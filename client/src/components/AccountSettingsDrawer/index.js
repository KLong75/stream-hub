import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Auth from "../../utils/auth";

import DeleteAccountModal from "../../components/DeleteAccountModal";
import UpdateUsernameModal from "../../components/UpdateUsernameModal";
import UpdateUserEmailModal from "../../components/UpdateUserEmailModal";
import UpdatePasswordModal from "../../components/UpdatePasswordModal";
import Heading from "../../components/Heading";




const AccountSettingsDrawer = () => {
//   const [drawerOpen, setDrawerOpen] = useState(false);


//   const navigate = useNavigate();
//   const [updateSuccess, setUpdateSuccess] = useState(false);

//   const [showRedirectMessage, setShowRedirectMessage] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(Auth.loggedIn());

//   useEffect(() => {
//     if (!isAuthenticated) {
//       setShowRedirectMessage(true);
//       setTimeout(() => {
//         navigate("/");
//       }, 3000);
//     }
//   }, [navigate, isAuthenticated]);

//   useEffect(() => {
//     setIsAuthenticated(Auth.loggedIn());
//   }, []);

//   const handlePasswordUpdate = () => {
//     setUpdateSuccess(true);
//     setTimeout(() => setUpdateSuccess(false), 5000); // hides the message after 5 seconds
//   };

//   const handleUserEmailUpdate = () => {
//     setUpdateSuccess(true);
//     setTimeout(() => setUpdateSuccess(false), 5000); // hides the message after 5 seconds
//   };

//   const handleUsernameUpdate = () => {
//     setUpdateSuccess(true);
//     setTimeout(() => setUpdateSuccess(false), 5000); // hides the message after 5 seconds
//   };

//   const [modalType, setModalType] = useState("");

//   if (showRedirectMessage) {
//     return <div>Please login or signup</div>;
//   }

//   return (
//     <main>
//       <Heading heading={"Account Settings"} variant="h3" />
//       <Grid container spacing={2} justifyContent="center" textAlign="center">
//         <Grid xs={12} md={6} lg={3}>
//           <Button onClick={() => setModalType("email")}>Update Email</Button>
//         </Grid>
//         <Grid xs={12} md={6} lg={3}>
//           <Button onClick={() => setModalType("username")}>
//             Update Username
//           </Button>
//         </Grid>
//         <Grid xs={12} md={6} lg={3}>
//           <Button onClick={() => setModalType("password")}>
//             Update Password
//           </Button>
//         </Grid>
//         <Grid xs={12} md={6} lg={3}>
//           <Button onClick={() => setModalType("delete")}>Delete Account</Button>
//         </Grid>
//       </Grid>
//       {modalType === "delete" && (
//         <DeleteAccountModal onClose={() => setModalType("")} />
//       )}
//       {modalType === "username" && (
//         <UpdateUsernameModal
//           onClose={() => setModalType("")}
//           onSuccessfulUpdate={handleUsernameUpdate}
//         />
//       )}
//       {modalType === "email" && (
//         <UpdateUserEmailModal
//           onClose={() => setModalType("")}
//           onSuccessfulUpdate={handleUserEmailUpdate}
//         />
//       )}
//       {modalType === "password" && (
//         <UpdatePasswordModal
//           onClose={() => setModalType("")}
//           onSuccessfulUpdate={handlePasswordUpdate}
//         />
//       )}
//       {updateSuccess && <div>Your account information has been updated.</div>}
//     </main>
//   );



const [state, setState] = useState({
  top: false,
  left: false,
  bottom: false,
  right: false,
});

const toggleDrawer = (anchor, open) => (event) => {
  if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    return;
  }

  setState({ ...state, [anchor]: open });
};

const list = (anchor) => (
  <Box
    sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
    role="presentation"
    onClick={toggleDrawer(anchor, false)}
    onKeyDown={toggleDrawer(anchor, false)}
  >
    <List>
      {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
        <ListItem key={text} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    <Divider />
    <List>
      {['All mail', 'Trash', 'Spam'].map((text, index) => (
        <ListItem key={text} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Box>
);

return (
  <div>
    {['left', 'right', 'top', 'bottom'].map((anchor) => (
      <React.Fragment key={anchor}>
        <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
        <Drawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
        >
          {list(anchor)}
        </Drawer>
      </React.Fragment>
    ))}
  </div>
);





};

export default AccountSettingsDrawer;
