import useStyles from './styles';
import { Button, Paper } from '@mui/material';
import Image from 'next/image';

export type CategoryProps = {
  imageUri: string;
  code: string;
  name: string;
  onClick: ({ code, name }: { code?: string; name: string }) => () => void;
};

const Category = ({ imageUri, code, name, onClick }: CategoryProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button onClick={onClick({ code, name })}>
        <Paper className={classes.body}>
          <div className={classes.imgW}>
            <div className={classes.imgC}>
              <Image
                src={imageUri}
                layout={'fill'}
                alt={name}
                placeholder={'blur'}
                blurDataURL={imageUri}
              />
            </div>
          </div>
          <div className={classes.clickInfo}>Klik untuk melihat produk</div>
          <div className={classes.name}>{name}</div>
        </Paper>
      </Button>
    </div>
  );
};

export default Category;
