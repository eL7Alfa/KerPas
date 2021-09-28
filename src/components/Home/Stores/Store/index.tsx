import useStyles from './styles';
import { Button, Paper } from '@mui/material';
import Image from 'next/image';

export type StoreProps = {
  imageUri: string;
  url: string;
  name: string;
};

const Store = ({ imageUri, url, name }: StoreProps) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button>
        <Paper className={classes.body}>
          <div className={classes.imgW}>
            <div className={classes.imgC}>
              <Image src={imageUri} layout={'fill'} alt={name} />
            </div>
          </div>
          <div className={classes.clickInfo}>Klik untuk melihat produk</div>
          <div className={classes.name}>{name}</div>
        </Paper>
      </Button>
    </div>
  );
};

export default Store;
