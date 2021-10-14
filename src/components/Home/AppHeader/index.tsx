import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Button, ClickAwayListener, Hidden, useTheme } from '@mui/material';
import CartButton from '../../CartButton';
import useStyles from './styles';

const AppHeader = () => {
  const theme = useTheme();
  const classes = useStyles();
  const [searchWidth, setSearchWidth] = useState('60%');

  const onSearchFocused = () => {
    setSearchWidth('100%');
  };

  const onSearchBlurred = () => {
    setSearchWidth('60%');
  };

  useEffect(() => {
    window.addEventListener('resize', onSearchBlurred);
    return () => {
      window.removeEventListener('resize', onSearchBlurred);
    };
  }, []);

  return (
    <AppBar position="fixed" elevation={5} className={classes.root}>
      <Toolbar color={'primary'}>
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
          <Button className={classes.loginButton} color={'secondary'}>
            MASUK
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
