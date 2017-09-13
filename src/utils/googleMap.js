import createGMapsApi from 'google-maps-api';
import { GOOGLE_API_KEY } from '../_configs';

export default async function getGoogleMapApi() {
  let mapapi;

  if (!mapapi) {
    mapapi = await createGMapsApi(GOOGLE_API_KEY, ['places'])();
  }

  return mapapi;
}