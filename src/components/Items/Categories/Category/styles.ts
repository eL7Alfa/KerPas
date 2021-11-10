import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { alpha } from '@mui/material';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      scrollSnapAlign: 'start',
      minWidth: `calc(1200px / 5)!important`,
      maxWidth: `calc(1200px / 5)!important`,
      display: 'flex',
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      position: 'relative',
      '& .MuiButton-root': {
        flex: 1,
        padding: 0,
      },
    },
    body: {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      width: '100%',
      boxShadow: '0 1px 4px 0 rgb(0 0 0 / 14%)',
      padding: theme.spacing(1.5),
      borderRadius: theme.spacing(1),
      height: '100%',
      '&:hover': {
        '& $imgW': {
          top: theme.spacing(-6),
          boxShadow: '0 12px 20px -5px rgb(0 0 0 / 30%)',
        },
      },
      background: `linear-gradient(0deg, ${alpha(
        theme.palette.primary.main,
        1,
      )} 0%, ${alpha(theme.palette.primary.main, 0.3)} 100%)`,
    },
    imgW: {
      position: 'absolute',
      top: theme.spacing(-2),
      width: `calc(100% - ${theme.spacing(3)})`,
      height: 180,
      boxShadow: '0 8px 10px -5px rgb(0 0 0 / 30%)',
      transition:
        'top 0.3s cubic-bezier(0.34, 1.61, 0.7, 1), box-shadow 0.3s cubic-bezier(0.34, 1.61, 0.7, 1)',
      borderRadius: theme.spacing(1),
      overflow: 'hidden',
    },
    imgC: {
      position: 'relative',
      width: '100%',
      height: 180,
      backgroundColor: '#eeeeee',
    },
    clickInfo: {
      fontSize: 12,
      marginTop: 180 - 50,
      color: grey[800],
      textTransform: 'none',
    },
    name: {
      display: 'flex',
      justifyContent: 'center',
      height: '100%',
      alignItems: 'center',
      marginTop: theme.spacing(1),
      color: '#ffffff',
      fontWeight: 800,
    },
  }),
);

export default useStyles;
