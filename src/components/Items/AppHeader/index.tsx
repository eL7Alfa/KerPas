import React, { Fragment, useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import {
  Button,
  ClickAwayListener,
  Container,
  Hidden,
  Menu,
  MenuItem,
} from '@mui/material';
import CartButton from '../CartButton';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  setAuthModalOpenR,
  setAuthResetUserDataR,
} from '../../../redux/actions';
import Image from 'next/image';
import { profileUrl } from '../../../config/urls';
import { rootReducerI } from '../../../redux/reducers';
import authDefStateR from '../../../redux/defaultStateR/authDefStateR';
import axios from '../../../config/axios';
import { KeyboardArrowDown, Room } from '@mui/icons-material';

const AppHeader = () => {
  const selector = useSelector((state: rootReducerI) => state);
  const dispatch = useDispatch();
  const {
    authState: { userData: userDataR },
  } = selector;
  const classes = useStyles();
  const [searchWidth, setSearchWidth] = useState('60%');
  const [userData, setUserData] = useState(userDataR);
  const [profileBtnEl, setProfileBtnEl] = React.useState<null | HTMLElement>(
    null,
  );
  const profileBtnHovered = Boolean(profileBtnEl);

  const onSearchFocused = () => {
    setSearchWidth('100%');
  };

  const onSearchBlurred = () => {
    setSearchWidth('60%');
  };

  const onProfileBtnClicked = (e: {
    currentTarget: React.SetStateAction<HTMLElement | null>;
  }) => {
    setProfileBtnEl(e.currentTarget);
  };

  const onLoginBtnClicked = () => {
    dispatch(setAuthModalOpenR(true));
  };

  const onLogoutClicked = () => {
    window.FB.getLoginStatus((resA: { status: string }) => {
      axios()
        .post('/user/logout', { ckode_user: userData.ckode_user })
        .then(({ data: { response } }) => {
          if (response === 200) {
            if (resA.status === 'connected') {
              window.FB.logout();
              localStorage.removeItem('fbAuth');
            }
            localStorage.removeItem('userData');
            dispatch(setAuthResetUserDataR());
          }
        });
    });
    onCloseProfileBtnClicked();
  };

  const onCloseProfileBtnClicked = () => {
    setProfileBtnEl(null);
  };

  const onAddressClicked = () => {};

  useEffect(() => {
    window.addEventListener('resize', onSearchBlurred);
    return () => {
      window.removeEventListener('resize', onSearchBlurred);
    };
  }, []);

  useEffect(() => {
    setUserData(userDataR);
  }, [userDataR]);

  return (
    <AppBar position="fixed" elevation={5} className={classes.root}>
      <Toolbar color={'primary'} className={classes.sectionAToolbar}>
        <Typography className={classes.title} variant="h6" noWrap>
          KERPAS
        </Typography>
        <Hidden smDown>
          <div className={classes.searchW}>
            <ClickAwayListener onClickAway={onSearchBlurred}>
              <div
                className={classes.search}
                style={{ width: `${searchWidth}` }}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Cari di kerpas"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                  onFocus={onSearchFocused}
                />
                <Button className={classes.searchBtn}>Cari</Button>
              </div>
            </ClickAwayListener>
          </div>
        </Hidden>
        <div className={classes.toolbarItemRight}>
          <CartButton classes={{ iconButton: classes.cartBtn }} />
          {userData === authDefStateR.userData ? (
            <Button
              className={classes.loginButton}
              color={'secondary'}
              onClick={onLoginBtnClicked}>
              MASUK
            </Button>
          ) : (
            <Fragment>
              <Button
                className={classes.userProfileBtn}
                onClick={onProfileBtnClicked}>
                <Image
                  src={`${profileUrl}/${userData.cprofile_picture}`}
                  layout={'fill'}
                  alt={userData.cprofile_picture}
                  placeholder={'blur'}
                  blurDataURL={`${profileUrl}/${userData.cprofile_picture}`}
                />
              </Button>
              <Menu
                open={profileBtnHovered}
                anchorEl={profileBtnEl}
                onClose={onCloseProfileBtnClicked}>
                <MenuItem onClick={onLogoutClicked}>Logout</MenuItem>
              </Menu>
            </Fragment>
          )}
        </div>
      </Toolbar>
      <Toolbar color={'primary'} className={classes.sectionBToolbar}>
        <Container maxWidth={'lg'} className={classes.sectionBC}>
          <div className={classes.sBAddressW}>
            <Room fontSize={'small'} className={classes.sBAddressIcon} />
            <Typography variant={'body2'} className={classes.sBAddressLabel}>
              Dikirim ke:
            </Typography>
            <Button className={classes.sBAddressBtn} onClick={onAddressClicked}>
              <Typography variant={'body2'} className={classes.sBAddressName}>
                Rumah
              </Typography>
              <Typography
                variant={'body2'}
                className={classes.sBAddressSeparator}>
                •
              </Typography>
              <Typography variant={'body2'} className={classes.sBAddress}>
                Jl. Pasaran Keke
              </Typography>
              <KeyboardArrowDown
                fontSize={'small'}
                className={classes.sBAddressKArrowDown}
              />
            </Button>
          </div>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
