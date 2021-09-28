import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: `calc(1200px / 4)!important`,
      maxWidth: `calc(1200px / 4)!important`,
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
      position: 'relative',
      width: '100%',
      boxShadow: '0 1px 4px 0 rgb(0 0 0 / 14%)',
      padding: theme.spacing(1.5),
      borderRadius: theme.spacing(1),
      '&:hover': {
        '& $imgW': {
          top: theme.spacing(-6),
          boxShadow: '0 12px 20px -5px rgb(0 0 0 / 30%)',
        },
      },
    },
    imgW: {
      position: 'absolute',
      top: theme.spacing(-2),
      width: `calc(100% - ${theme.spacing(3)})`,
      height: 180,
      boxShadow: '0 8px 10px -5px rgb(0 0 0 / 30%)',
      transition:
        'top 0.3s cubic-bezier(0.34, 1.61, 0.7, 1), box-shadow 0.3s cubic-bezier(0.34, 1.61, 0.7, 1)',
    },
    imgC: {
      position: 'relative',
      width: '100%',
      height: 180,
      overflow: 'hidden',
      borderRadius: theme.spacing(0.5),
    },
    clickInfo: {
      fontSize: 12,
      marginTop: 180 - 50,
      color: grey[600],
      textTransform: 'none',
    },
    name: {
      marginTop: theme.spacing(1),
      color: grey[800],
    },
  }),
);

export default useStyles;
