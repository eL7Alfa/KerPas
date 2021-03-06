import { useEffect, useState } from 'react';
import axios from '../config/axios';
import { menuImgUrl } from '../config/urls';

export const useGetCampaigns = (marketCode: string) => {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  useEffect(() => {
    if (marketCode) {
      axios()
        .post('/market/ads/campaign', {
          category: 7,
          marketId: marketCode,
        })
        .then(({ data }) => {
          if (data.response === 200 && data && !data.error) {
            setCampaigns(data.result);
          } else {
            setCampaigns([]);
          }
        })
        .catch(() => setCampaigns([]));
    } else {
      setCampaigns([]);
    }
  }, [marketCode]);
  return { campaigns, setCampaigns };
};

export const useGetCategories = () => {
  const [categories, setCategories] = useState<any[]>([]);
  useEffect(() => {
    axios()
      .get('/market/menu')
      .then(({ data }) => {
        if (data.response === 200 && data && !data.error) {
          const newCategories = data.result.map(
            (d: { ckelas: string; cicon: string; ckode_kelas: string }) => {
              return {
                name: d.ckelas,
                imageUri: `${menuImgUrl}/${d.cicon}`,
                code: d.ckode_kelas,
              };
            },
          );
          setCategories(newCategories);
        }
      })
      .catch(() => {});
  }, []);
  return { categories, setCategories };
};
