import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Button, ClickAwayListener, useTheme } from '@mui/material';
import CartButton from '../../CartButton';
import useStyles from './styles';

const AppHeader = () => {
  const theme = useTheme();
  const classes = useStyles();
  const [searchWidth, setSearchWidth] = useState('60%');

  const onSearchFocused = () => {
    if (window.innerWidth > theme.breakpoints.values.lg) {
      setSearchWidth(`${theme.breakpoints.values.lg - 16 * 2}px`);
    } else {
      setSearchWidth('100%');
    }
  };

  const onSearchBlurred = () => {
    setSearchWidth('60%');
  };

  return (
    <AppBar position="fixed" elevation={5} className={classes.root}>
      <Toolbar color={'primary'}>
        <Typography className={classes.title} variant="h6" noWrap>
          KERPAS
        </Typography>
        <div className={classes.searchW}>
          <ClickAwayListener onClickAway={onSearchBlurred}>
            <div className={classes.search} style={{ width: `${searchWidth}` }}>
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
        <div className={classes.toolbarItemRight}>
          <CartButton classes={{ iconButton: classes.cartBtn }} />
          <Button className={classes.loginButton} color={'secondary'}>
            MASUK
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
