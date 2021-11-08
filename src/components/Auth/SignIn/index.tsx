import React, { useState } from 'react';
import {
  Box,
  ButtonBase,
  Card,
  CardContent,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  Close,
  FacebookRounded,
  Person,
  Visibility,
  VisibilityOff,
  VpnKey,
} from '@mui/icons-material';
import theme from '../../../config/theme';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import {
  setAuthModalOpenR,
  setAuthUserDataR,
} from '../../../redux/actions/authRActions';
import axios from '../../../config/axios';
import Snackbar from '../../../smallComponents/Snackbar';
import { useSnackbarConst } from '../../constants';
import { LoadingButton } from '@mui/lab';

const SignIn = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [passIsVisible, setPassIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { snackbarState, setSnackPack, onSnackbarClose } = useSnackbarConst();

  const onInputChanged =
    (name: string | number) =>
    (e: { target: { value: React.SetStateAction<string> } }) => {
      switch (name) {
        case 'email': {
          setEmail(e.target.value);
          break;
        }
        case 'password': {
          setPassword(e.target.value);
          break;
        }
      }
    };

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!email || !password) {
      setSnackPack(prev => [
        ...prev,
        {
          ...snackbarState,
          open: true,
          severity: 'error',
          msg: 'Masukkan Email dan Kata Sandi!',
          key: new Date().getTime(),
        },
      ]);
      return;
    }

    if (!isAuthenticating) {
      setIsAuthenticating(true);
      const formData = {
        email_phone: email,
        kata_kunci: password,
      };
      axios()
        .post('/user/auth', formData)
        .then(({ data: { error, result } }) => {
          if (!error) {
            localStorage.setItem('userData', JSON.stringify(result));
            dispatch(setAuthUserDataR(result));
            dispatch(setAuthModalOpenR(false));
          } else {
            setSnackPack(prev => [
              ...prev,
              {
                ...snackbarState,
                open: true,
                severity: 'error',
                msg: 'Email/No. HP atau Kata Sandi salah!',
                key: new Date().getTime(),
              },
            ]);
          }
        })
        .catch(() => {
          setSnackPack(prev => [
            ...prev,
            {
              ...snackbarState,
              open: true,
              severity: 'error',
              msg: 'Terjadi kesalahan, coba lagi sekarang atau nanti.',
              key: new Date().getTime(),
            },
          ]);
        })
        .finally(() => setIsAuthenticating(false));
    }
  };

  const fBAuth = () => {
    if (!isAuthenticating) {
      setIsAuthenticating(true);
      window.FB.getLoginStatus((resA: { status: string }) => {
        if (resA.status === 'connected') {
          window.FB.logout();
        }
        window.FB.login((resB: { authResponse: any }) => {
          if (resB.authResponse) {
            localStorage.setItem('fbAuth', JSON.stringify(resB));
            window.FB.api('/me', (resC: { id: string; name: string }) => {
              axios()
                .post('/user/register', { fb_id: resC.id })
                .then(({ data }) => {
                  if (data.response === 200) {
                    localStorage.setItem(
                      'userData',
                      JSON.stringify(data.result),
                    );
                    dispatch(setAuthUserDataR(data.result));
                    dispatch(setAuthModalOpenR(false));
                  }
                })
                .finally(() => setIsAuthenticating(false));
            });
          } else {
            setIsAuthenticating(false);
          }
        });
      });
    }
  };

  const onShowPasswordClicked = () => {
    setPassIsVisible(!passIsVisible);
  };

  const onPasswordMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const onCloseAuthBtnClicked = () => {
    dispatch(setAuthModalOpenR(false));
  };

  return (
    <Card className={classes.card}>
      <div className={classes.shapeA} />
      <div className={classes.shapeB} />
      <div className={classes.shapeC} />
      <div className={classes.shapeD} />
      <Snackbar
        key={snackbarState.key}
        open={snackbarState.open}
        msg={snackbarState.msg}
        severity={snackbarState.severity}
        onClose={onSnackbarClose}
        anchorOrigin={snackbarState.anchorOrigin}
        className={classes.snackbar}
        autoHideDuration={snackbarState.timeout}
      />
      <Toolbar sx={{ px: `0!important` }}>
        <div>
          <Typography variant={'h4'} fontWeight={'bold'}>
            Masuk
          </Typography>
          <Typography variant={'body2'}>
            Gunakan kunci anda untuk masuk.
          </Typography>
        </div>
      </Toolbar>
      <CardContent sx={{ px: 0 }}>
        <Box
          component={'form'}
          onSubmit={onSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
            <Person
              sx={{ color: theme.palette.primary.main, mr: 1, my: 'auto' }}
            />
            <TextField
              variant={'filled'}
              size={'small'}
              label={'Email atau nomor handphone'}
              className={classes.textField}
              onChange={onInputChanged('email')}
              value={email}
              name={'email'}
              fullWidth
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
            <VpnKey
              sx={{ color: theme.palette.primary.main, mr: 1, my: 'auto' }}
            />
            <TextField
              variant={'filled'}
              size={'small'}
              label={'Kata sandi'}
              type={passIsVisible ? 'text' : 'password'}
              className={classes.textField}
              onChange={onInputChanged('password')}
              value={password}
              name={'password'}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={onShowPasswordClicked}
                      onMouseDown={onPasswordMouseDown}
                      edge="end">
                      {passIsVisible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <LoadingButton
            variant={'contained'}
            className={classes.submitBtn}
            type={'submit'}
            loading={isAuthenticating}>
            MASUK
          </LoadingButton>
        </Box>
        <div className={classes.orSocialBtnW}>
          <Typography variant={'body2'}>Atau masuk dengan</Typography>
        </div>
        <div className={classes.socialAuthW}>
          <IconButton
            onClick={fBAuth}
            className={classes.facebookBtn}
            disabled={isAuthenticating}>
            <FacebookRounded />
          </IconButton>
        </div>
        <Divider />
        <div className={classes.toRegisterW}>
          <Typography variant={'body2'}>Belum punya akun?</Typography>
          <ButtonBase>Daftar Sekarang</ButtonBase>
        </div>
      </CardContent>
      <IconButton
        className={classes.closeAuthBtn}
        onClick={onCloseAuthBtnClicked}>
        <Close />
      </IconButton>
    </Card>
  );
};

export default SignIn;
