import React from 'react';
import {
  Box,
  Button,
  ButtonBase,
  Card,
  CardContent,
  Divider,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { FacebookRounded, Person, VpnKey } from '@mui/icons-material';
import theme from '../../../config/theme';
import useStyles from './styles';

const SignIn = () => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <div className={classes.shapeA} />
      <div className={classes.shapeB} />
      <div className={classes.shapeC} />
      <div className={classes.shapeD} />
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
              type={'password'}
              className={classes.textField}
              fullWidth
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
    </Card>
  );
};

export default SignIn;
