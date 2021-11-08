import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { alpha } from '@mui/material';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      padding: theme.spacing(2),
      boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
      borderRadius: 4,
      borderLeftWidth: '2px',
      borderLeftColor: theme.palette.primary.main,
      borderLeftStyle: 'solid',
      '&.selected': {
        borderWidth: '1px',
        borderColor: theme.palette.primary.main,
        borderStyle: 'solid',
        backgroundColor: alpha(theme.palette.primary.main, 0.2),
      },
    },
    leftPart: {
      display: 'flex',
      flexDirection: 'column',
    },
    addressType: {
      fontWeight: 800,
    },
    addressName: {
      fontWeight: 'normal',
    },
    addressDetail: {
      margin: `${theme.spacing(1)} 0`,
      fontWeight: 'normal',
    },
    rightPart: {
      marginLeft: 'auto',
      display: 'flex',
      flexDirection: 'column',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
      alignItems: 'center',
    },
    selectBtn: {
      backgroundColor: theme.palette.primary.main,
      borderRadius: 8,
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
      },
    },
    selectedCheckbox: {
      color: theme.palette.primary.main,
    },
  }),
);

export default useStyles;
