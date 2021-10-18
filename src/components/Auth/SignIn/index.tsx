import React, { useState } from 'react';
import {
  Box,
  Button,
  ButtonBase,
  Card,
  CardContent,
  Divider,
  IconButton,
  InputAdornment,
  SnackbarOrigin,
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
import { setAuthModalOpenR, setAuthUserDataR } from '../../../redux/actions';
import axios from '../../../config/axios';
import Snackbar from '../../../smallComponents/Snackbar';
import { useSnackbarConst } from './constants';

const SignIn = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [passIsVisible, setPassIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { snackbarState, setSnackbarState, onSnackbarClose } =
    useSnackbarConst();

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
    if (!isAuthenticating) {
      const formData = {
        email_phone: email,
        kata_kunci: password,
      };
      axios()
        .post('/user/auth', formData)
        .then(({ data: { error, result } }) => {
          if (!error) {
            localStorage.setItem('userCode', result.ckode_user);
            localStorage.setItem('token', result.token);
            dispatch(setAuthUserDataR(result));
          } else {
            setSnackbarState(prevState => ({
              ...prevState,
              open: true,
              severity: 'error',
              msg: 'Email/No. HP atau Kata Sandi salah!',
            }));
          }
        })
        .catch(() => {
          setSnackbarState(prevState => ({
            ...prevState,
            open: true,
            severity: 'error',
            msg: 'Terjadi kesalahan, coba lagi sekarang atau nanti.',
          }));
        })
        .finally(() => setIsAuthenticating(false));
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
          <Button
            variant={'contained'}
            className={classes.submitBtn}
            type={'submit'}>
            MASUK
          </Button>
        </Box>
        <div className={classes.orSocialBtnW}>
          <Typography variant={'body2'}>Atau masuk dengan</Typography>
        </div>
        <div className={classes.socialAuthW}>
          <IconButton className={classes.facebookBtn}>
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
