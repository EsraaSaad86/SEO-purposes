import osmtogeojson from 'osmtogeojson';

export const convertToGeoJsonData = (data) => {
  return osmtogeojson(data);
}
