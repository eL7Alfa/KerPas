import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        width: '95%',
      },
      maxWidth: theme.breakpoints.values.sm,
    },
    container: {
      backgroundColor: theme.palette.background.paper,
      padding: `${theme.spacing(2)}`,
      borderRadius: 10,
      overflow: 'hidden',
    },
    header: {
      padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    },
    body: {
      overflowY: 'auto',
      maxHeight: 400,
    },
    footer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: `${theme.spacing(1)} 0`,
    },
    addAddressBtn: {
      width: '100%',
      borderColor: theme.palette.primary.main,
      color: theme.palette.primary.main,
      borderRadius: 8,
      fontWeight: 800,
      '&:hover': {
        borderColor: theme.palette.primary.main,
      },
    },
    closeBtn: {
      position: 'absolute',
      top: theme.spacing(1),
      right: theme.spacing(1),
    },
    toConfigureAddressesInfo: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    profileBtn: {
      padding: theme.spacing(0.5),
      color: theme.palette.primary.main,
      fontWeight: 800,
    },
  }),
);

export default useStyles;
