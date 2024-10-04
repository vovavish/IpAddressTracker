async function  getIpInfo(inputValue = '8.8.8.8') {
  const url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_2Y4uyct4I0b2R4hwPHD8Y2qdxx4Lm&ipAddress=${inputValue}`;
  const res = await fetch(url);

  return await res.json();
}

export { getIpInfo };