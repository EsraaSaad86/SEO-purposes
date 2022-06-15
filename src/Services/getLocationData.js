import axios from 'axios';
import { convertToGeoJsonData } from './osmDataConverter';

const url = 'https://www.openstreetmap.org/api/0.6/map';

const getGeoJsonData = async (values) => {
  return await axios
    .get(
      `${url}?bbox=${values.left},${values.bottom},${values.right},${values.top}`,
      {
        'Content-Type': 'application/xml; charset=utf-8',
      }
    )
    .then((response) => {
      return convertToGeoJsonData(response.data);
    })
    .catch((error) => {
      return Promise.reject(error.response);
    });
};

export default getGeoJsonData;
