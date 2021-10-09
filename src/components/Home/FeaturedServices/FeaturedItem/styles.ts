import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const iconWrapperWH = 60;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      paddingLeft: iconWrapperWH * 0.4,
      width: '100%',
      backgroundColor: 'rgba(0,0,0,0)',
    },
    root: {
      display: 'flex',
      flexFlow: 'row nowrap',
      position: 'relative',
      padding: `${theme.spacing(1)} 0`,
      minHeight: iconWrapperWH,
      minWidth: iconWrapperWH,
      borderRadius: theme.spacing(1),
      borderColor: grey[300],
      borderWidth: 1,
      borderStyle: 'solid',
      height: '100%',
      backgroundColor: '#ffffff',
    },
    iconContainer: {
      display: 'flex',
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: -(iconWrapperWH * 0.4),
      color: '#ffffff',
      width: iconWrapperWH,
      height: iconWrapperWH,
      '-webkit-box-shadow': '0px 10px 18px -8px rgba(0,0,0,0.3)',
      '-moz-box-shadow': '0px 10px 18px -8px rgba(0,0,0,0.3)',
      boxShadow: '0px 10px 18px -8px rgba(0,0,0,0.3)',
      borderRadius: theme.spacing(1),
    },
    descContainer: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      height: 'auto',
    },
    title: {
      fontSize: 18,
      [theme.breakpoints.down('sm')]: {
        fontSize: 16,
      },
      color: grey[800],
    },
    subtitle: {
      fontSize: 14,
      [theme.breakpoints.down('sm')]: {
        fontSize: 12,
      },
      color: grey[600],
    },
  }),
);

export default useStyles;
