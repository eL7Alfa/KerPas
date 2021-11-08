import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { alpha } from '@mui/material';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(2),
      margin: `${theme.spacing(2)} ${theme.spacing(1)}`,
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
    sectionA: {
      display: 'flex',
      flexDirection: 'row',
    },
    sectionB: {
      display: 'flex',
      flexDirection: 'row',
    },
    leftPart: {
      display: 'flex',
      flexDirection: 'column',
    },
    addressType: {
      fontWeight: 800,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
    address: {
      fontWeight: 'normal',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      '-webkit-line-clamp': 2,
      '-webkit-box-orient': 'vertical',
    },
    addressByGoogle: {
      margin: `${theme.spacing(1)} 0`,
      fontWeight: 'normal',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      '-webkit-line-clamp': 2,
      '-webkit-box-orient': 'vertical',
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
    editBtn: {
      marginLeft: 'auto',
      borderLeftColor: theme.palette.primary.main,
      borderLeftWidth: 2,
      borderRightColor: theme.palette.primary.main,
      borderRightWidth: 2,
      borderStyle: 'solid',
      borderRadius: 0,
      padding: 0,
      color: theme.palette.primary.main,
      fontWeight: 800,
    },
  }),
);

export default useStyles;
