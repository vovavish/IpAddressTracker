import L from '../libraries/leaflet/dist/leaflet';
import 'babel-polyfill';

import { isValidIp } from './components/validation';
import { getIpInfo }from './components/api';
import { addOffset } from './components/mapHelper';

import marker from '../images/icon-location.svg';

import '../libraries/leaflet/dist/leaflet.css';

const ipInput = document.querySelector('.header__search-input');
const searchButton = document.querySelector('.header__search-button');

const ip = document.querySelector('#ip');
const location = document.querySelector('#location');
const timezone = document.querySelector('#time-zone');
const isp = document.querySelector('#isp');

const mapArea = document.querySelector('.map');

const zoom = 13;

const map = L.map(mapArea, {
  center: [51.505, -0.09],
  zoom: zoom,
});


L.tileLayer(`https://tile.openstreetmap.org/{z}/{x}/{y}.png`, {
  attribution: "Challenge by <a target='_blank' href='https://www.frontendmentor.io?ref=challenge'>Frontend Mentor</a> Coded by <a target='_blank' href='https://github.com/vovavish'>Vladimir Vishnyakov</a>",
}).addTo(map);

const markerIcon = L.icon({
  iconUrl: marker,
  iconSize: [25, 35],
  iconAnchor: [12, 35],
});

ipInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    searchButton.click();
  }
});

searchButton.addEventListener('click', () => {
  const inputValue = ipInput.value;

  if (!isValidIp(inputValue)) {
    alert('Please enter a valid IP address');
    return;
  }

  getIpInfo(inputValue)
    .then(setIpInfo);
});

function setIpInfo(ipData) {
  ip.textContent = ipData.ip;
  location.textContent = `${ipData.location.country}, ${ipData.location.region}`;
  timezone.textContent = ipData.location.timezone;
  isp.textContent = ipData.isp;

  map.setView([ipData.location.lat, ipData.location.lng], zoom);
  L.marker([ipData.location.lat, ipData.location.lng], { icon: markerIcon }).addTo(map);

  if (matchMedia('(max-width: 768px)').matches) {
    addOffset(map);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  getIpInfo('8.8.8.8')
    .then(setIpInfo);
});