import { useEffect, useState } from 'react';
import axios from '../config/axios';
import { newProducts } from '../components/constants';

export const useGetProductsByCategory = ({
  marketCode,
  categoryId,
}: {
  marketCode: string;
  categoryId: number;
}) => {
  const [productsByCategory, setProductsByCategory] = useState<any[]>([]);
  useEffect(() => {
    if (marketCode) {
      axios()
        .post('/market/product', {
          limit: 12,
          type: 'category',
          subcategory: categoryId,
          marketId: marketCode,
        })
        .then(({ data }) => {
          if (
            data.response === 200 &&
            data &&
            !data.error &&
            data.result.data.length
          ) {
            setProductsByCategory(newProducts(data.result.data));
          }
        })
        .catch(() => {});
    } else {
      setProductsByCategory([]);
    }
  }, [marketCode]);
  return { productsByCategory, setProductsByCategory };
};
