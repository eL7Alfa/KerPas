import React, {
  ChangeEvent,
  Fragment,
  SyntheticEvent,
  useEffect,
  useState,
} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import {
  Avatar,
  Button,
  ButtonBase,
  ClickAwayListener,
  Container,
  Divider,
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
} from '../../../redux/actions/authRActions';
import Image from 'next/image';
import { profileUrl } from '../../../config/urls';
import { rootReducerI } from '../../../redux/reducers';
import authDefStateR from '../../../redux/defaultStateR/authDefStateR';
import axios from '../../../config/axios';
import { KeyboardArrowDown, Room } from '@mui/icons-material';
import {
  setMyAddressesOpenR,
  setNearestMarketR,
  setSelectedAddressR,
} from '../../../redux/actions/appRActions';
import MyAddresses from '../MyAddresses';
import { useRouter } from 'next/router';

const AppHeader = () => {
  const selector = useSelector((state: rootReducerI) => state);
  const dispatch = useDispatch();
  const router = useRouter();
  const { searchText } = router.query;
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
  const [selectedAddress, setSelectedAddress] = useState<any>({});
  const [searchTextS, setSearchTextS] = useState('');

  const onLogoClicked = () => {
    router.pathname === '/' ? router.reload() : router.push('/');
  };

  const onSearchFocused = () => {
    setSearchWidth('100%');
  };

  const onSearchBlurred = () => {
    setSearchWidth('60%');
  };

  const onSearchInputChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setSearchTextS(e.target.value);
  };
  const onSearchSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    !!formData.get('search') &&
      router.push(`/search/${formData.get('search')}`);
  };

  const onAccountBtnClicked = (e: {
    currentTarget: React.SetStateAction<HTMLElement | null>;
  }) => {
    setProfileBtnEl(e.currentTarget);
  };

  const onLoginBtnClicked = () => {
    dispatch(setAuthModalOpenR(true));
  };

  const onTransactionBtnClicked = () => {
    router.push('/transactions');
    onCloseProfileBtnClicked();
  };

  const onProfileBtnClicked = () => {
    window.open('https://keranjangbelanja.co.id/profil');
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
            localStorage.removeItem('selectedAddress');
            dispatch(
              setNearestMarketR({
                calamat_toko: '',
                cdeskripsi: '',
                cfoto: '',
                ckode_mitra: '',
                ckota: '',
                cnama_mitra: '',
                distance: { text: '', value: 0 },
                cloc: 0,
              }),
            );
            dispatch(setSelectedAddressR({}));
            dispatch(setAuthResetUserDataR());
            router.pathname !== '/' && router.push('/');
          }
        });
    });
    onCloseProfileBtnClicked();
  };

  const onCloseProfileBtnClicked = () => {
    setProfileBtnEl(null);
  };

  const onSelectAddressClicked = () => {
    if (!userData.id) {
      dispatch(setAuthModalOpenR(true));
    } else {
      dispatch(setMyAddressesOpenR(true));
    }
  };

  useEffect(() => {
    setSelectedAddress(selector.appState.selectedAddress);
  }, [selector.appState.selectedAddress]);

  useEffect(() => {
    window.addEventListener('resize', onSearchBlurred);
    return () => {
      window.removeEventListener('resize', onSearchBlurred);
    };
  }, []);

  useEffect(() => {
    setUserData(userDataR);
  }, [userDataR]);

  useEffect(() => {
    setSearchTextS((searchText as string) ?? '');
  }, [searchText]);

  return (
    <Fragment>
      <AppBar position="fixed" elevation={5} className={classes.root}>
        <Toolbar color={'primary'} className={classes.sectionAToolbar}>
          <ButtonBase
            className={classes.titleW}
            disableRipple
            onClick={onLogoClicked}>
            <Avatar
              alt={'keranjang-belanja'}
              src={'/assets/images/keranjang-belanja-logo.png'}
            />
            <Typography className={classes.title} variant="h6" noWrap>
              KERPAS
            </Typography>
          </ButtonBase>
          <Hidden smDown>
            <form
              className={classes.searchW}
              onSubmit={onSearchSubmit}
              method={'GET'}>
              <ClickAwayListener onClickAway={onSearchBlurred}>
                <div
                  className={classes.search}
                  style={{ width: `${searchWidth}` }}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    name={'search'}
                    value={searchTextS}
                    onChange={onSearchInputChange}
                    placeholder="Cari di kerpas"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    onFocus={onSearchFocused}
                  />
                  <Button className={classes.searchBtn} type={'submit'}>
                    Cari
                  </Button>
                </div>
              </ClickAwayListener>
            </form>
          </Hidden>
          <div className={classes.toolbarItemRight}>
            {userData !== authDefStateR.userData &&
              router.pathname !== '/cart' && (
                <CartButton classes={{ iconButton: classes.cartBtn }} />
              )}
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
                  onClick={onAccountBtnClicked}>
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
                  <MenuItem onClick={onTransactionBtnClicked}>
                    Riwayat Transaksi
                  </MenuItem>
                  <MenuItem onClick={onProfileBtnClicked}>Profil</MenuItem>
                  <Divider />
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
              {Object.keys(selectedAddress).length ? (
                <Button
                  className={classes.sBAddressBtn}
                  onClick={onSelectAddressClicked}>
                  <Typography
                    variant={'body2'}
                    className={classes.sBAddressName}>
                    {selectedAddress.cnama_alamat}
                  </Typography>
                  <Typography
                    variant={'body2'}
                    className={classes.sBAddressSeparator}>
                    ???
                  </Typography>
                  <Typography variant={'body2'} className={classes.sBAddress}>
                    {selectedAddress.maddress}
                  </Typography>
                  <KeyboardArrowDown
                    fontSize={'small'}
                    className={classes.sBAddressKArrowDown}
                  />
                </Button>
              ) : (
                <Button
                  className={classes.sBAddressBtn}
                  onClick={onSelectAddressClicked}>
                  <Typography
                    variant={'body2'}
                    className={classes.sBSelectAddress}>
                    Pilih Alamat
                  </Typography>
                  <KeyboardArrowDown
                    fontSize={'small'}
                    className={classes.sBAddressKArrowDown}
                  />
                </Button>
              )}
            </div>
          </Container>
        </Toolbar>
      </AppBar>
      <MyAddresses />
    </Fragment>
  );
};

export default AppHeader;
