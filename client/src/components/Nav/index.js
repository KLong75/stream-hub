// import from react
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// import from mui
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import CloseIcon from "@mui/icons-material/Close";
// import components
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

  
  return (
    <nav>
      <Grid
        container
        textAlign={"center"}
        alignItems="center"
        justifyContent={"center"}
      >
        {isMobile ? (
          <>
            <Grid xs={6}></Grid>
            <Grid xs={2}>
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
                  width: "60%",
                  boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
                  backgroundImage:
                    "linear-gradient(315deg, #185a9d 0%, #43cea2 100%)",
                  alignItems: "center",
                  overflow: "hidden",
                },
              }}
            >
              <CloseIcon
                onClick={handleDrawerClose}
                sx={{
                  marginTop: ".75rem",
                  marginRight: "12rem",
                  cursor: "pointer",
                }}
              />
              <Box sx={{ marginTop: "2rem" }}>
                <List sx={{justifyContent: 'center'}}>
                  {location.pathname !== "/home_page" && (
                    <>
                      <ListItem sx={{ textAlign: "center", justifyContent: 'center'}}>
                        <HomeIconLink />
                      </ListItem>
                      <Divider />
                    </>
                  )}
                  <ListItem sx={{ textAlign: "center", justifyContent: 'center'}}>
                    <WhatsHotModal />
                  </ListItem>
                  <Divider />
                  <ListItem sx={{ textAlign: "center", justifyContent: 'center'}}>
                    <SearchDrawerIconButton />
                  </ListItem>
                  <Divider />
                  <ListItem sx={{ textAlign: "center", justifyContent: 'center'}}>
                    <AccountSettingsIconButton />
                  </ListItem>
                  <Divider />
                  <ListItem sx={{ textAlign: "center", justifyContent: 'center'}}>
                    <LogOutButton />
                  </ListItem>
                  <Divider />
                </List>
              </Box>
            </Drawer>
          </>
        ) : (
          <>
            {location.pathname !== "/home_page" && (
              <Grid xs={2}>
                <HomeIconLink />
              </Grid>
            )}
            <Grid xs={2}>
              <WhatsHotModal />
            </Grid>
            <Grid xs={2}>
              <SearchDrawerIconButton />
            </Grid>
            <Grid xs={2}>
              <AccountSettingsIconButton />
            </Grid>
            <Grid xs={2}>
              <LogOutButton />
            </Grid>
          </>
        )}
      </Grid>
    </nav>
  );
};

export default Nav;
