// import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// // import from utils

// // import from mui
// import Grid from "@mui/material/Unstable_Grid2/Grid2";
// import { IconButton, Menu, MenuItem } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";

// // import components
// import AccountSettingsIconButton from "../AccountSettingsIconButton";
// import SearchDrawerIconButton from "../SearchDrawerIconButton";
// import LogOutButton from "../LogOutButton";
// import WhatsHotModal from "../WhatsHotModal";
// import HomeIconLink from "../HomeIconLink";

// const Nav = () => {
//   const location = useLocation();
//   const [menuAnchor, setMenuAnchor] = useState(null);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 920);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleMenuOpen = (event) => {
//     setMenuAnchor(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setMenuAnchor(null);
//   };

//   return (
//     <>
//       <nav>
//         <Grid
//           container
//           alignItems="center"
//           justifyContent={"center"}
//           textAlign="center"
//         >
//           <Grid xs={2}></Grid>
//           {/* conditionally render home link based on the current path */}
//           {location.pathname !== "/home_page" && (
//             <Grid xs={2}>
//               <HomeIconLink />
//             </Grid>
//           )}
//           <Grid xs={2}>
//             <WhatsHotModal />
//           </Grid>
//           <Grid xs={2}>
//             <SearchDrawerIconButton />
//           </Grid>
//           <Grid xs={2}>
//             <AccountSettingsIconButton />
//           </Grid>
//           <Grid xs={2}>
//             <LogOutButton />
//           </Grid>
//         </Grid>
//       </nav>
//     </>
//   );
// };

// export default Nav;

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CloseIcon from "@mui/icons-material/Close";
import AccountSettingsIconButton from "../AccountSettingsIconButton";
import SearchDrawerIconButton from "../SearchDrawerIconButton";
import LogOutButton from "../LogOutButton";
import WhatsHotModal from "../WhatsHotModal";
import HomeIconLink from "../HomeIconLink";

const Nav = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 920);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 920);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDrawerOpen = (event) => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  // const StyledPaper = styled(Paper)({
  //   width: "30%",
  //   borderRadius: 8,
  //   boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
  // });

  return (
    <nav>
      <Grid container alignItems="center" justifyContent={"center"}>
        {isMobile ? (
          <>
            <Grid xs={6}></Grid>
            <Grid item xs={2}>
              <IconButton onClick={handleDrawerOpen}>
                <MenuIcon fontSize="large" />
              </IconButton>
              <Grid xs={4}></Grid>
            </Grid>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={handleDrawerClose}
              PaperProps={{
                style: {
                  width: "30%",
                  boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
                  backgroundImage:
                    "linear-gradient(315deg, #185a9d 0%, #43cea2 100%)",
                  alignItems: "center",
                },
              }}
            >
              <CloseIcon
                onClick={handleDrawerClose}
                sx={{
                  marginTop: "2rem",
                  marginRight: "12rem",
                  cursor: "pointer",
                }}
              />
              <Box sx={{ marginTop: "2rem" }}>
                <List>
                  {location.pathname !== "/home_page" && (
                    <>
                      <ListItem>
                        <ListItemIcon>
                          <HomeIconLink />
                        </ListItemIcon>
                      </ListItem>
                      <Divider />
                    </>
                  )}
                  <ListItem>
                    <ListItemIcon>
                      <WhatsHotModal />
                    </ListItemIcon>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <SearchDrawerIconButton />
                    </ListItemIcon>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <AccountSettingsIconButton />
                    </ListItemIcon>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <LogOutButton />
                    </ListItemIcon>
                  </ListItem>
                  <Divider />
                </List>
              </Box>
            </Drawer>
          </>
        ) : (
          <>
            {location.pathname !== "/home_page" && (
              <Grid item xs={2}>
                <HomeIconLink />
              </Grid>
            )}
            <Grid item xs={2}>
              <WhatsHotModal />
            </Grid>
            <Grid item xs={2}>
              <SearchDrawerIconButton />
            </Grid>
            <Grid item xs={2}>
              <AccountSettingsIconButton />
            </Grid>
            <Grid item xs={2}>
              <LogOutButton />
            </Grid>
          </>
        )}
      </Grid>
    </nav>
  );
};

export default Nav;
