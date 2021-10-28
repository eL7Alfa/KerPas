import axios from '../../src/config/axios';
import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { googleMapsApiKey } from '../../src/components/constants';
import axiosBase from 'axios';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data } = await axios().get('/market/get');
    formidable().parse(req, async (err, fields) => {
      const { lat, lng } = fields;
      if (
        !lat ||
        !lng ||
        !(isFinite(Number(lat)) && Math.abs(Number(lat)) <= 90) ||
        !(isFinite(Number(lng)) && Math.abs(Number(lng)) <= 180)
      ) {
        const result = {
          result: [],
          status: 'Bad Request',
          response: 400,
          error: false,
          errorMessage: `Fill or check the required fields ("lat" & "lng")!`,
        };
        res.status(400).json(result);
      }
      if (data.response === 200) {
        let destinations = '';
        data.result.map((d: { dlat: string; dlng: string }) => {
          destinations = `${destinations}|${Number(d.dlat)},${Number(d.dlng)}`;
        });
        destinations = destinations.substr(1);
        const resGoogle = await axiosBase.get(
          `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${lat},${lng}&destinations=${destinations}&key=${googleMapsApiKey}`,
        );
        const { data: dataG } = resGoogle;
        const statusG = resGoogle.status;
        if (dataG.status === 'OK' && statusG === 200) {
          const { rows: r } = dataG;
          const { elements } = r[0];

          const newData = data.result
            .map((d: any, key: number) => {
              if (elements[key].status === 'OK') {
                return {
                  ...d,
                  distance: elements[key].distance,
                };
              }
            })
            .filter((d: { distance: { value: number } }) => {
              if (d) {
                // return d.distance.value <= 3000;
                return true;
              }
            })
            .sort(
              (
                a: { distance: { value: number } },
                b: { distance: { value: number } },
              ) => {
                if (a) {
                  return a.distance.value - b.distance.value;
                }
              },
            );
          if (newData.length > 0) {
            const result = {
              result: newData[0],
              status: dataG.status,
              response: statusG,
              error: false,
              errorMessage: null,
            };
            res.status(statusG).json(result);
          } else {
            const result = {
              result: [],
              status: dataG.status,
              response: statusG,
              error: false,
              errorMessage: null,
            };
            res.status(statusG).json(result);
          }
        } else {
          const result = {
            result: [],
            status: dataG.status,
            error: true,
            response: statusG,
            errorMessage: dataG.error_message,
          };
          res.status(statusG).json(result);
        }
      }
    });
  } catch (e: any) {
    const result = {
      result: [],
      status: e.response.status || e.status,
      response: e.response.status || e.status,
      error: true,
      errorMessage: e.response.data.message || e.message,
    };
    res.status(e.response.status || e.status).json(result);
  }
};

export default handler;
