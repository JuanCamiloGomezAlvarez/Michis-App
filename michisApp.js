const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=3';

const API_URL_FAVORITE = 'https://api.thecatapi.com/v1/favourites';

const API_URL_FAVORITE_DELETE = (id) =>
  `https://api.thecatapi.com/v1/favourites/${id}`;

const API_URL_UPLOAD = 'https://api.thecatapi.com/v1/images/upload';

const API_KEY = '1c150012-2a85-4ac4-9220-1d43571dfd33';

const spanError = document.getElementById('error');

//#################################################################

async function loadRandomMichis() {
  const response = await fetch(API_URL_RANDOM);
  const data = await response.json();
  console.log('random ', data);

  if (response.status !== 200) {
    spanError.innerHTML = 'Hubo un error: ' + response.status + data.message;
  } else {
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const img3 = document.getElementById('img3');

    const button1 = document.getElementById('button1-random');
    const button2 = document.getElementById('button2-random');
    const button3 = document.getElementById('button3-random');

    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;

    button1.onclick = () => saveFavoriteMichi(data[0].id);
    button2.onclick = () => saveFavoriteMichi(data[1].id);
    button3.onclick = () => saveFavoriteMichi(data[2].id);
  }
}
loadRandomMichis();

//#################################################################

async function loadFavoriteMichi() {
  const response = await fetch(API_URL_FAVORITE, {
    method: 'GET',
    headers: {
      'X-API-KEY': API_KEY,
    },
  });
  const status = response.status;
  const data = await response.json();
  console.log('favorites', data);

  if (status !== 200) {
    spanError.innerHTML = 'Hubo un error: ' + status + data.message;
  } else {
    const section = document.getElementById('favorites-michis');
    section.innerHTML = '';
    section.classList.add('favorites-michis');

    data.forEach((michi) => {
      const article = document.createElement('article');
      article.classList.add('article_random-michis');
      const img = document.createElement('img');
      const input = document.createElement('button');
      const inputText = document.createTextNode('Delete michi');
      input.classList.add('button-favorite');

      img.src = michi.image.url;
      img.width = 200;
      img.height = 200;
      input.appendChild(inputText);
      input.onclick = () => deleteFavoriteMichi(michi.id);
      article.appendChild(img);
      article.appendChild(input);
      section.appendChild(article);
    });
  }
}
loadFavoriteMichi();

//#################################################################

async function saveFavoriteMichi(id) {
  const response = await fetch(API_URL_FAVORITE, {
    method: 'POST',
    headers: {
      'content-Type': 'application/json',
      'X-API-KEY': API_KEY,
    },
    body: JSON.stringify({
      image_id: id,
    }),
  });

  const data = await response.json();
  const status = response.status;
  console.log('save');
  console.log('response ', response);

  if (status !== 200) {
    spanError.innerHTML = 'Hubo un error: ' + status + data.message;
  } else {
    console.log('michi was add to favorite successfully');
    Swal.fire({
      title: 'your michi has been add to favorite succesfully',
      confirmButtonColor: 'rgb(220, 20, 60)',
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
    });
    loadFavoriteMichi();
  }
}

//#################################################################

async function deleteFavoriteMichi(id) {
  const response = await fetch(API_URL_FAVORITE_DELETE(id), {
    method: 'DELETE',
    headers: {
      'X-API-KEY': API_KEY,
    },
  });
  const data = await response.json();
  if (response.status !== 200) {
    spanError.innerHTML = 'Hubo un error: ' + response.status + data.message;
  } else {
    console.log('michi was delete successfully');
    Swal.fire({
      title: 'your michi has been delete succesfully',
      confirmButtonColor: 'rgb(220, 20, 60)',
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
    });
    loadFavoriteMichi();
  }
}

//##################################################################

async function uploadMichi() {
  const form = document.getElementById('upload-form');
  const formData = new FormData(form);

  console.log(formData.get('file'));

  const response = await fetch(API_URL_UPLOAD, {
    method: 'POST',
    headers: {
      'X-API-KEY': API_KEY,
    },
    body: formData,
  });

  const data = await response.json();

  if (response.status !== 201) {
    spanError.innerHTML =
      'Hubo un error: ' + response.status + ' ' + data.message;
  } else {
    console.log('michi was load succesfully');
    console.log({ data });
    console.log(data.url);
    saveFavoriteMichi(data.id);
  }
}
