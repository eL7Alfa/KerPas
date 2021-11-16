import useStyles from './styles';
import { Button, Fade, IconButton } from '@mui/material';
import Image from 'next/image';
import toRupiah from '../../../modules/toRupiah';
import { AddShoppingCart } from '@mui/icons-material';
import { useRouter } from 'next/router';

export type ProductProps = {
  imageUri: string;
  name: string;
  price: number;
  discount: number;
  fixedPrice: number;
  slug: string;
};

const Product = ({
  imageUri,
  name,
  price,
  discount,
  fixedPrice,
  slug,
}: ProductProps) => {
  const classes = useStyles();
  const router = useRouter();

  const onItemClick = () => {
    router.push(`/product/${slug}`);
  };

  return (
    <Fade in>
      <div className={classes.root}>
        <IconButton className={classes.addToCartBtn}>
          <AddShoppingCart />
        </IconButton>
        <Button classes={{ root: classes.body }} onClick={onItemClick}>
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
            {discount > 0 && (
              <div className={classes.priceW}>
                <div className={classes.price}>{toRupiah(price)}</div>
                <div className={classes.discount}>{discount}%</div>
              </div>
            )}
            <div className={classes.fixedPrice}>{toRupiah(fixedPrice)}</div>
          </div>
        </Button>
      </div>
    </Fade>
  );
};

export default Product;
