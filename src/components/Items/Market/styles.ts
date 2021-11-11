import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRadius: theme.spacing(1),
      overflow: 'hidden',
      boxShadow: '0 10px 15px -5px rgba(0,0,0,0.15)',
    },
    itemInfoW: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
    },
    itemImgW: {
      display: 'flex',
      position: 'relative',
      minWidth: 220,
      width: 220,
      [theme.breakpoints.down('md')]: {
        minWidth: 180,
        width: 180,
      },
      [theme.breakpoints.down('sm')]: {
        minWidth: 160,
        width: 160,
      },
    },
    itemInfoDetail: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(2),
      [theme.breakpoints.down('md')]: {
        padding: theme.spacing(1),
      },
    },
    detailMarketName: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      '-webkit-line-clamp': 2,
      '-webkit-box-orient': 'vertical',
      fontWeight: 800,
      [theme.breakpoints.down('md')]: {
        fontSize: 26,
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: 20,
      },
      color: '#424242',
    },
    detailAddress: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      '-webkit-line-clamp': 2,
      '-webkit-box-orient': 'vertical',
      margin: `${theme.spacing(1)} 0`,
      fontWeight: 800,
      [theme.breakpoints.down('md')]: {
        fontSize: 16,
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: 14,
      },
      color: '#424242',
    },
    detailDistance: {
      marginTop: 'auto',
      fontSize: 24,
      [theme.breakpoints.down('md')]: {
        fontSize: 18,
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: 14,
      },
      fontWeight: 800,
      color: '#777777',
    },
    detailLocationW: {
      display: 'flex',
      textAlign: 'left',
      alignItems: 'center',
    },
    locationIcon: {
      fontSize: 24,
      [theme.breakpoints.down('md')]: {
        fontSize: 18,
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: 14,
      },
      color: '#62ac42',
    },
    detailLocation: {
      fontWeight: 800,
      fontSize: 24,
      [theme.breakpoints.down('md')]: {
        fontSize: 18,
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: 14,
      },
      color: '#777777',
    },
  }),
);

export default useStyles;
