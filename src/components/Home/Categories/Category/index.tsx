import useStyles from './styles';
import { Button, Paper } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';

export type CategoryProps = {
  imageUri: string;
  code: string;
  name: string;
};

const Category = ({ imageUri, code, name }: CategoryProps) => {
  const classes = useStyles();
  const router = useRouter();

  const onClick = () => {
    router.push(`/category/${code}?name=${name}`, undefined, {
      scroll: false,
    });
  };

  return (
    <div className={classes.root}>
      <Button {...{ onClick }}>
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
