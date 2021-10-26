import useStyles from './styles';
import { Button, Fade, IconButton } from '@mui/material';
import Image from 'next/image';
import toRupiah from '../../../modules/toRupiah';
import { AddShoppingCart } from '@mui/icons-material';

export type ProductProps = {
  imageUri: string;
  url: string;
  name: string;
  price: number;
  discount: number;
  fixedPrice: number;
  onClick?: () => void;
  onCartClick?: () => void;
};

const Product = ({
  imageUri,
  url,
  name,
  price,
  discount,
  fixedPrice,
  onClick = () => {},
  onCartClick = () => {},
}: ProductProps) => {
  const classes = useStyles();
  return (
    <Fade in>
      <div className={classes.root}>
        <IconButton className={classes.addToCartBtn}>
          <AddShoppingCart />
        </IconButton>
        <Button classes={{ root: classes.body }}>
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
