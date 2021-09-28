import { Paper, Typography } from '@mui/material';
import useStyles from './styles';
import { JSXElementConstructor, ReactElement } from 'react';

export type FeaturedItemProps = {
  icon: () => ReactElement<any, string | JSXElementConstructor<any>>;
  iconBgColor: string;
  subtitle: string;
  title: string;
};

const FeaturedItem = ({
  icon,
  title,
  subtitle,
  iconBgColor,
}: FeaturedItemProps) => {
  const classes = useStyles();
  const Icon = icon;
  return (
    <Paper elevation={0} className={classes.wrapper}>
      <Paper elevation={0} className={classes.root}>
        <div>
          <Paper
            elevation={0}
            className={classes.iconContainer}
            style={{ background: iconBgColor }}>
            <Icon />
          </Paper>
        </div>
        <div className={classes.descContainer}>
          <Typography variant={'h4'} className={classes.title}>
            {title}
          </Typography>
          <Typography variant={'body2'} className={classes.subtitle} py={1}>
            {subtitle}
          </Typography>
        </div>
      </Paper>
    </Paper>
  );
};

export default FeaturedItem;
