import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import { createStyles, makeStyles } from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search';
import { alpha, Button } from '@mui/material';
import CartButton from '../../CartButton';
import { Theme } from '@mui/material/styles';
import useStyles from './styles';

const AppHeader = () => {
  const classes = useStyles();
  const [searchWidth, setSearchWidth] = useState(60);

  const onSearchFocused = () => {
    setSearchWidth(100);
  };

  const onSearchBlurred = () => {
    setSearchWidth(60);
  };

  return (
    <AppBar position="fixed" elevation={5} className={classes.root}>
      <Toolbar color={'primary'}>
        <Typography className={classes.title} variant="h6" noWrap>
          KERPAS
        </Typography>
        <div className={classes.searchW}>
          <div className={classes.search} style={{ width: `${searchWidth}%` }}>
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
              onBlur={onSearchBlurred}
            />
          </div>
        </div>
        <div className={classes.toolbarItemRight}>
          <CartButton />
          <Button className={classes.loginButton} color={'secondary'}>
            MASUK
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
