import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      display: 'flex',
      width: 300,
      flexDirection: 'column',
      boxShadow: '0 20px 25px -10px rgba(0,0,0,0.15)',
      borderRadius: 8,
      [theme.breakpoints.down('sm')]: {
        width: 'unset',
        flex: 1,
        flexDirection: 'row',
      },
    },
    supplierImg: {
      position: 'relative',
      width: 300,
      height: 300,
      borderRadius: 8,
      overflow: 'hidden',
      boxShadow: '0 10px 10px -5px rgba(0,0,0,0.15)',
      [theme.breakpoints.down('sm')]: {
        width: 150,
        height: 150,
      },
    },
    supplierDetails: {
      display: 'flex',
      flexDirection: 'column',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    locationIcon: {
      fontSize: 18,
      color: '#62ac42',
    },
    location: {
      display: 'flex',
      fontSize: 12,
      textAlign: 'left',
      alignItems: 'center',
    },
  }),
);

export default useStyles;
