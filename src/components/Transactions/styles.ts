import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import { alpha } from '@mui/material';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      padding: theme.spacing(1),
    },
    sidebar: {
      display: 'flex',
      flexDirection: 'column',
      minWidth: 250,
      minHeight: 600,
      background: `linear-gradient(-45deg, ${theme.palette.primary.main} 0%, ${green[800]} 100%)`,
      backgroundColor: theme.palette.primary.main,
      borderRadius: theme.spacing(1),
      boxShadow: `0 25px 25px -12px ${alpha(theme.palette.primary.main, 0.5)}`,
      overflow: 'hidden',
    },
    subItem: {
      padding: theme.spacing(1),
    },
    subItemTitle: {
      color: '#ffffff',
      fontWeight: 800,
      padding: `0 ${theme.spacing(0.5)}`,
    },
    sbItemW: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: `0 ${theme.spacing(1)}`,
      margin: `${theme.spacing(1)} 0`,
    },
    sidebarItemBtn: {
      backgroundColor: 'rgba(0,0,0,0.1)',
      color: '#ffffff',
      borderRadius: theme.spacing(1),
      fontWeight: 800,
      width: '100%',
      boxShadow: 'none',
      textTransform: 'unset',
      textAlign: 'unset',
      justifyContent: 'unset',
      '&.active': {
        backgroundColor: '#ffffff',
        color: green[900],
      },
      '&:hover': {
        backgroundColor: '#ffffff',
        color: green[900],
      },
    },
  }),
);

export default useStyles;
