import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { alpha } from '@mui/material';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      borderBottom: `1px ${grey[500]}`,
      marginTop: theme.spacing(4),
    },
    title: {
      color: grey[800],
    },
    itemsW: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(4),
      display: 'flex',
    },
    gridItem: { display: 'flex' },
    showMoreW: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    showMoreBtn: {
      backgroundColor: '#ffffff',
      border: `1px ${theme.palette.primary.main} solid`,
      borderRadius: 10,
      color: theme.palette.primary.main,
      '&.MuiLoadingButton-loading': {
        border: `1px ${alpha(theme.palette.primary.main, 0.2)} solid`,
      },
      '&:hover': {
        border: `1px ${theme.palette.primary.main} solid`,
      },
      [theme.breakpoints.up('sm')]: {
        '&:hover': {
          color: '#ffffff',
          backgroundColor: theme.palette.primary.main,
          boxShadow: `0 10px 20px -5px ${alpha(
            theme.palette.primary.main,
            0.5,
          )}`,
        },
      },
    },
  }),
);

export default useStyles;
