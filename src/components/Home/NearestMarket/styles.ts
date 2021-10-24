import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      margin: `${theme.spacing(2)} 0`,
      padding: `${theme.spacing(2)} ${theme.spacing(1)}`,
      overflow: 'hidden',
    },
    imgBgW: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    imgBgC: {
      position: 'relative',
      width: '100%',
      paddingTop: '30%',
      borderRadius: theme.spacing(2),
      overflow: 'hidden',
    },
    itemW: {
      display: 'flex',
      position: 'relative',
    },
    itemC: {
      display: 'flex',
      maxWidth: '55%',
      minWidth: '45%',
      height: 'fit-content',
      marginTop: theme.spacing(10),
      marginLeft: theme.spacing(5),
      borderRadius: theme.spacing(1),
    },
    itemInfoW: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
    },
    itemImgW: {
      display: 'flex',
      position: 'relative',
      width: 220,
      height: 220,
    },
    itemInfoDetail: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(2),
    },
    detailMarketName: {
      fontWeight: 800,
      color: '#424242',
    },
    detailAddress: {
      margin: 'auto 0',
      fontWeight: 800,
      color: '#424242',
    },
    detailDistance: {
      marginTop: 'auto',
      fontSize: 24,
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
      color: '#62ac42',
    },
    detailLocation: {
      fontWeight: 800,
      fontSize: 24,
      color: '#777777',
    },
  }),
);

export default useStyles;
