import React, { useState } from "react";
import { Link } from "react-router-dom";

///////////////////////    MATERIAL UI Component    //////////////////
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

///////////////////////   MATERIAL ICONS     ///////////////////////
import ListItemIcon from "@material-ui/core/ListItemIcon";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PersonIcon from "@material-ui/icons/Person";

/////////////////////////    REDUX     //////////////////////////////
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../redux/actions/userAction";

//////////////////////////   CUSTOM STYLE    /////////////////////////
import { useStyles } from "./CustomStyles/header";

export default function MenuAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const openEl = Boolean(anchorEl);
  const [toggle, setToggle] = useState(false);

  ////////////////////////    REDUX     ////////////////////////////////
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(userLogout());
    setAnchorEl(null);
  };

  //////////////////////////    FOR Dropdown Menu    /////////////////////////////
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            onClick={() => setToggle(true)}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.link_brand} to="/">
              eShop
            </Link>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          {/*/////////////////////////////     CART BUTTON     ///////////////////////////////*/}
          &nbsp; &nbsp; &nbsp; &nbsp;
          <Link className={classes.link} to="/cart">
            <Button color="inherit">
              <ShoppingCartIcon />
              &nbsp; Cart
            </Button>
          </Link>
          {userInfo ? (
            ////////////////////////////     DROPDOWN MENU IF USER EXISTS OR LOGGED IN    /////////////////////////
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                style={{ fontSize: "1.25rem" }}
              >
                <AccountCircle />
                &nbsp;
                {userInfo.name.split(" ")[0]}
              </IconButton>
              <Menu
                id="menu-appbar"
                elevation={0}
                getContentAnchorEl={null}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                open={openEl}
                onClose={handleClose}
              >
                <Link to="/profile" className={classes.link_menu_item}>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                  </MenuItem>
                </Link>

                <MenuItem
                  onClick={logoutHandler}
                  className={classes.link_menu_item}
                >
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </MenuItem>
              </Menu>
            </div>
          ) : (
            ////////////////////////////    LOGIN BUTTON IF USER DOES NOT EXISTS OR LOGGED OUT   /////////////////////////

            <Link className={classes.link} to="/login">
              <Button color="inherit">
                <GroupAddIcon />
                &nbsp; LOGIN
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="bottom" open={toggle} onClose={() => setToggle(false)}>
        <List>
          {userInfo ? (
            ////////////////////////////    LOGOUT BUTTON IF USER EXISTS OR LOGGED IN  /////////////////////////

            <ListItem
              button
              className={classes.link_drawer}
              onClick={logoutHandler}
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItem>
          ) : (
            ////////////////////////////    LOGIN BUTTON IF USER DOES NOT EXISTS OR LOGGED OUT   /////////////////////////

            <Link className={classes.link_drawer} to="/login">
              <ListItem button>
                <ListItemIcon>
                  <GroupAddIcon />
                </ListItemIcon>
                <ListItemText primary={"Login"} />
              </ListItem>
            </Link>
          )}

          <Link className={classes.link_drawer} to="/cart">
            <ListItem button>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary={"Cart"} />
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </header>
  );
}
