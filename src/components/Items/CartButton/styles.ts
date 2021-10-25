import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cartButton: {
      backgroundColor: '#ffffff',
      borderRadius: 8,
      '&.MuiButton-root': {
        boxShadow:
          '0px 3px 1px -2px rgba(254,204,43,0.2), 0px 2px 2px 0px rgba(254,204,43,0.1), 0px 1px 5px 0px rgba(254,204,43,0.08)',
        color: theme.palette.background.default,
        '&:hover': {
          boxShadow:
            '0px 5px 10px 5px rgba(254,204,43,0.3), 0px 5px 2px 0px rgba(254,204,43,0.1), 0px 1px 5px 0px rgba(254,204,43,0.08)',
          backgroundColor: theme.palette.secondary.main,
        },
      },
    },
    popper: {
      zIndex: 9999,
    },
    cartMenuPaperW: {
      paddingTop: 10,
    },
    paperPopCartList: {
      padding: '10px 0',
      borderRadius: 10,
      boxShadow:
        '0 13px 27px -5px rgb(50 50 93 / 25%), 0 8px 16px -8px rgb(0 0 0 / 30%), 0 -6px 16px -6px rgb(0 0 0 / 3%)',
    },
  }),
);

export default useStyles;
