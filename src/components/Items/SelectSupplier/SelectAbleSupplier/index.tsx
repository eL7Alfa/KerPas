import useStyles from './styles';
import { Button, Paper } from '@mui/material';
import Image from 'next/image';
import { CheckCircleRounded } from '@mui/icons-material';

export type SupplierPropsTypes = {
  active: boolean;
  supplierId: number;
  imageUri: string;
  name: string;
  marketName: string;
  block: string;
  location: string;
  categories: any[];
  onClick: () => void;
};

const SelectAbleSupplier = ({
  active = false,
  imageUri,
  name,
  marketName,
  block,
  onClick = () => {},
}: SupplierPropsTypes) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button onClick={onClick}>
        <Paper className={`${classes.body} ${active ? 'active' : ''}`}>
          <div className={classes.imgW}>
            <Image
              src={imageUri}
              layout={'fill'}
              alt={name}
              placeholder={'blur'}
              blurDataURL={imageUri}
            />
          </div>
          <div className={classes.detailW}>
            <div className={classes.name}>{name}</div>
            <div className={classes.marketName}>{marketName}</div>
            <div className={classes.block}>{block}</div>
          </div>
        </Paper>
      </Button>
      {active && <CheckCircleRounded className={classes.activeIcon} />}
    </div>
  );
};

export default SelectAbleSupplier;
