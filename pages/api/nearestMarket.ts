import axios from '../../src/config/axios';
import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import {
  getDistanceMatrix,
  googleMapsApiKey,
} from '../../src/components/constants';
import axiosBase from 'axios';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data } = await axios().get('/market/get');
    formidable().parse(req, (err, fields, files) => {
      if (data.response === 200) {
        let destinations = '';
        data.result.map((d: { dlat: string; dlng: string }) => {
          destinations = `${destinations}|${Number(d.dlat)},${Number(d.dlng)}`;
        });
        destinations = destinations.substr(1);
        const { lat, lng } = fields;
        axiosBase
          .get(
            `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${lat},${lng}&destinations=${destinations}&key=${googleMapsApiKey}`,
          )
          .then(({ data: { rows: r } }) => {
            const { elements } = r[0];

            const newData = data.result
              .map((d: any, key: number) => {
                return {
                  ...d,
                  distance: elements[key].distance,
                };
              })
              // .filter((d: { distance: { value: number } }) => {
              //   return d.distance.value <= 3000;
              // })
              .sort(
                (
                  a: { distance: { value: number } },
                  b: { distance: { value: number } },
                ) => {
                  return a.distance.value - b.distance.value;
                },
              );
            if (newData.length > 0) {
              res.status(200).json(newData[0]);
            }
          });
      }
    });
  } catch (e) {
    res.status(200).json(e);
  }
};

export default handler;
