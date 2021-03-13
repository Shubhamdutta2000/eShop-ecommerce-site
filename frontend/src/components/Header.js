import React, { useState } from "react";
import { Route, Link } from "react-router-dom";

///////////////////////    MATERIAL UI Component    //////////////////
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";

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
import AccountCircle from "@material-ui/icons/AccountCircle";
import PersonIcon from "@material-ui/icons/Person";

///////////////////////// Search Box component   ///////////////////
import SearchBox from "./SearchProductBox";

/////////////////////////    REDUX     //////////////////////////////
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../redux/actions/userAction";

//////////////////////////   CUSTOM STYLE    /////////////////////////
import { useStyles } from "./CustomStyles/header";
import {
  PeopleAlt,
  ShoppingBasket,
  ShoppingCart,
  SupervisorAccount,
} from "@material-ui/icons";

export default function Header({ isMobile }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElAdmin, setAnchorElAdmin] = useState(null);
  const openEl = Boolean(anchorEl);
  const openElAdmin = Boolean(anchorElAdmin);
  const [toggle, setToggle] = useState(false);

  ////////////////////////    REDUX     ////////////////////////////////
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(userLogout());
    setAnchorEl(null);
  };

  ///    FOR Dropdown Menu    ///

  ///  FOR USER  ///
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  ///  FOR ADMIN USER  ///
  const handleAdminMenu = (event) => {
    setAnchorElAdmin(event.currentTarget);
  };

  const handleAdminMenuClose = () => {
    setAnchorElAdmin(null);
  };

  return (
    <header className={classes.root}>
      <AppBar position="fixed" elevation={10} className={classes.appbar}>
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
          {/*// Search Box Component */}
          <Route render={({ history }) => <SearchBox history={history} />} />
          &nbsp; &nbsp; &nbsp; &nbsp;
          {/*//  CART BUTTON (if logged in goes to /cart otherwise redirect to /login )  //*/}
          <Link
            className={classes.link}
            to={userInfo ? "/cart" : "/login?redirect=cart"}
          >
            <Button color="inherit">
              <ShoppingCartIcon />
              &nbsp; Cart
            </Button>
          </Link>
          {userInfo ? (
            ///     DROPDOWN MENU IF USER EXISTS OR LOGGED IN   ///
            <>
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
                {!isMobile ? userInfo.name.split(" ")[0] : null}
              </IconButton>
              <Menu
                id="menu-appbar"
                className={classes.menu}
                elevation={4}
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
                TransitionComponent={Fade}
                open={openEl}
                onClose={handleClose}
              >
                {/*//    USER NAME ON MOBILE VIEW    //*/}
                {isMobile ? (
                  <MenuItem onClick={handleClose}>
                    <IconButton>
                      <AccountCircle />
                    </IconButton>
                    <ListItemText primary={userInfo.name.split(" ")[0]} />
                  </MenuItem>
                ) : null}
                {/*//      PROFILE BUTTON if user is logged in      */}
                <Link to="/profile" className={classes.link_menu_item}>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                  </MenuItem>
                </Link>

                {/*//    LOGOUT BUTTON (if user is logged in)    //*/}
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

              {/* ///     ADMIN SECTION OF DROPDOWN IF USER ADMIN EXISTS OR LOGGED IN   /// */}
              {userInfo.isAdmin ? (
                <>
                  <IconButton
                    aria-label="account of admin user"
                    aria-controls="menu-admin-appbar"
                    aria-haspopup="true"
                    onClick={handleAdminMenu}
                    color="inherit"
                    style={{ fontSize: "1.25rem" }}
                  >
                    <SupervisorAccount />
                    &nbsp;
                    {!isMobile ? "Admin" : null}
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    className={classes.menu}
                    elevation={4}
                    getContentAnchorEl={null}
                    anchorEl={anchorElAdmin}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                    TransitionComponent={Fade}
                    open={openElAdmin}
                    onClose={handleAdminMenuClose}
                  >
                    {/*//   USER LIST    */}
                    <Link
                      to="/admin/userlist"
                      className={classes.link_menu_item}
                    >
                      <MenuItem onClick={handleAdminMenuClose}>
                        <ListItemIcon>
                          <PeopleAlt />
                        </ListItemIcon>
                        <ListItemText primary="Users" />
                      </MenuItem>
                    </Link>
                    {/*//   PRODUCT LIST    */}
                    <Link
                      to="/admin/productlist"
                      className={classes.link_menu_item}
                    >
                      <MenuItem onClick={handleAdminMenuClose}>
                        <ListItemIcon>
                          <ShoppingBasket />
                        </ListItemIcon>
                        <ListItemText primary="Products" />
                      </MenuItem>
                    </Link>
                    {/*//   ORDERS LIST    */}
                    <Link
                      to="/admin/orderlist"
                      className={classes.link_menu_item}
                    >
                      <MenuItem onClick={handleAdminMenuClose}>
                        <ListItemIcon>
                          <ShoppingCart />
                        </ListItemIcon>
                        <ListItemText primary="Orders" />
                      </MenuItem>
                    </Link>
                  </Menu>
                </>
              ) : null}
            </>
          ) : (
            ///    LOGIN BUTTON IF USER DOES NOT EXISTS OR LOGGED OUT  ///
            <Link className={classes.link} to="/login">
              <Button color="inherit">
                <GroupAddIcon />
                &nbsp; LOGIN
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>

      {/*///      FOR MOBILE VIEW    ///*/}
      <Drawer anchor="bottom" open={toggle} onClose={() => setToggle(false)}>
        <List>
          {userInfo ? (
            ///    LOGOUT BUTTON IF USER EXISTS OR LOGGED IN   ///
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
            ///    LOGIN BUTTON IF USER DOES NOT EXISTS OR LOGGED OUT    ///

            <Link className={classes.link_drawer} to="/login">
              <ListItem button>
                <ListItemIcon>
                  <GroupAddIcon />
                </ListItemIcon>
                <ListItemText primary={"Login"} />
              </ListItem>
            </Link>
          )}

          <Link
            className={classes.link_drawer}
            to={userInfo ? "/cart" : "/login?redirect=cart"}
          >
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
