// en esta linea de codigo a continuacion estamos haciendo uso de los
// query parameters en este caso ?limit=3 que me trae tres search
const URL =
  'https://api.thecatapi.com/v1/images/search?limit=3&api_key=1c150012-2a85-4ac4-9220-1d43571dfd33';

async function reload() {
  const res = await fetch(URL);
  const data = await res.json();

  console.log(data);

  const img1 = document.getElementById('img1');
  const img2 = document.getElementById('img2');
  const img3 = document.getElementById('img3');

  img1.src = data[0].url;
  img2.src = data[1].url;
  img3.src = data[2].url;
}

reload();
