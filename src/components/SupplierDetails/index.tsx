import React, { useEffect, useState } from 'react';
import Supplier from './Supplier';
import {
  useGetProducts,
  useGetSpecificSupplier,
} from '../../Requests/GlobalRequests';
import useStyles from './styles';
import Categories from './Categories';
import { menuImgUrl } from '../../config/urls';
import Products from '../Items/Products';
import { useSelector } from 'react-redux';
import { rootReducerI } from '../../redux/reducers';
import axios from '../../config/axios';
import { newProducts } from '../constants';

const SupplierDetails = ({ supplierId }: { supplierId?: number }) => {
  const classes = useStyles();
  const { appState } = useSelector((state: rootReducerI) => state);
  const [nearestMarket, setNearestMarket] = useState<{ [key: string]: any }>(
    {},
  );
  const { supplier, market } = useGetSpecificSupplier(Number(supplierId));
  const [currentCat, setCurrentCat] = useState<{ code?: string; name: string }>(
    {
      code: undefined,
      name: '',
    },
  );
  const [currentProductPage, setCurrentProductPage] = useState<number>(1);
  const {
    products,
    isProductsLoading,
    lastProductsPage,
    setIsProductsLoading,
    setProducts,
  } = useGetProducts({
    marketCode: nearestMarket.ckode_mitra,
    productType: 'category',
    categoryId: Number(currentCat.code),
  });

  const categories = supplier.categories.map(d => {
    return {
      name: d.ckelas,
      imageUri: `${menuImgUrl}/${d.cicon}`,
      code: d.ckode_kelas,
    };
  });

  const onShowMoreProductBtnClicked = () => {
    const nextProductPage = currentProductPage + 1;
    if (!isProductsLoading && nextProductPage <= lastProductsPage) {
      setIsProductsLoading(true);
      axios()
        .post(`/market/product?page=${nextProductPage}`, {
          limit: 12,
          type: 'category',
          marketId: nearestMarket.ckode_mitra,
          subcategory: Number(currentCat.code),
        })
        .then(({ data }) => {
          setProducts(prevProducts => [
            ...prevProducts,
            ...newProducts(data.result.data),
          ]);
          setCurrentProductPage(nextProductPage);
        })
        .finally(() => setIsProductsLoading(false));
    }
  };

  const onCategoryClick =
    (currentCat: { code?: string; name: string }) => () => {
      setCurrentCat(currentCat);
      setCurrentProductPage(1);
    };

  useEffect(() => {
    setNearestMarket(appState.nearestMarket);
  }, [appState.nearestMarket]);

  useEffect(() => {
    if (supplier.supplierId) {
      setCurrentCat({
        code: supplier.categories[0].ckode_kelas,
        name: supplier.categories[0].ckelas,
      });
    }
  }, [supplier]);

  return (
    <div className={classes.root}>
      <div className={classes.sectionA}>
        <Supplier {...{ supplier, market }} />
        <div className={classes.catW}>
          <Categories
            {...{
              categories,
              onClick: onCategoryClick,
            }}
          />
        </div>
      </div>
      <Products
        name={currentCat.name}
        data={products}
        onShowMoreBtnClicked={onShowMoreProductBtnClicked}
        isLoading={isProductsLoading}
        isLastProductReached={currentProductPage + 1 > lastProductsPage}
      />
    </div>
  );
};

export default SupplierDetails;
