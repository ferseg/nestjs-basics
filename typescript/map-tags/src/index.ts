import { User } from './User';
import { Map } from './Map';

const user = new User();
const map = new Map('map');
map.addMarker(user.location.lng, user.location.lat);
