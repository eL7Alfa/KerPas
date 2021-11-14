import useStyles from './styles';
import { Button, Paper } from '@mui/material';
import Image from 'next/image';
import { Room } from '@mui/icons-material';
import { useRouter } from 'next/router';

export type SupplierProps = {
  supplierId: number;
  imageUri: string;
  name: string;
  marketName: string;
  block: string;
  location: string;
};

const Supplier = ({
  supplierId,
  imageUri,
  name,
  marketName,
  block,
  location,
}: SupplierProps) => {
  const classes = useStyles();
  const router = useRouter();

  const onClick = () => {
    router.push(`/supplier/${supplierId}`);
  };

  return (
    <div className={classes.root}>
      <Button onClick={onClick}>
        <Paper className={classes.body}>
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
            <div className={classes.location}>
              <Room className={classes.locationIcon} />
              {location}
            </div>
          </div>
        </Paper>
      </Button>
    </div>
  );
};

export default Supplier;
