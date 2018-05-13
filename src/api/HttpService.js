import router from '../router';
import { api as apiConfig } from '../config/config';

function getFinalUrl(url = '') {
  let { baseUrl } = apiConfig;
  if (baseUrl.slice(-1) !== '/') {
    baseUrl += '/';
  }
  if (url[0] === '/') {
    url = url.slice(1); // eslint-disable-line
  }
  return baseUrl + url;
}

function toQueryString(data) {
  if (!data) return '';
  const qs = Object.keys(data)
    .map(key => `${key}=${encodeURIComponent(data[key])}`)
    .join('&');

  return `?${qs}`;
}

function makeRequest(url, options) {
  // if (!options.headers) {
  //   options.headers = {}; // eslint-disable-line
  // }

  // options.headers.Authorization = `Bearer ${sessionStorage.getItem('id_token')}`;
  // eslint-disable-line

  return fetch(url, options).then((response) => {
    if (response.status === 401) {
      router.replace({ name: 'Login' });
      return 'UNAUTHORIZED';
    } else if (response.status === 403) {
      router.replace({ name: 'Home' });
      return 'FORBIDDEN';
    } else if (!response.ok) {
      return response.json().then(json => Promise.reject(json));
    }
    return response.json();
  }).then(responseData => responseData);
}

class HttpService {
  static post(url, data) {
    return makeRequest(getFinalUrl(url), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
  static put(url, data) {
    return makeRequest(getFinalUrl(url), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
  static get(url, data) {
    const qs = toQueryString(data);
    return makeRequest(getFinalUrl(`${url}${qs}`), {
      method: 'GET',
    });
  }
  static delete(url) {
    return makeRequest(getFinalUrl(url), {
      method: 'DELETE',
    });
  }
  static uploadFile(url, file, data = {}) {
    const body = new FormData();
    body.append('file', file);
    Object.keys(data).forEach((key) => {
      body.append(key, data[key]);
    });
    return makeRequest(getFinalUrl(url), {
      method: 'POST',
      body,
    });
  }
  static uploadFilesAndForm(url, data, files) {
    const body = new FormData();

    for (let index = 1; index <= files.length; index++) { // eslint-disable-line
      body.append(`file${Number(index)}`, files[index - 1]);
    }

    body.append('filesCount', files.length);

    Object.keys(data).forEach((key) => {
      if (key === 'emails') {
        body.append(key, JSON.stringify(data[key]));
      } else {
        body.append(key, data[key]);
      }
    });
    return makeRequest(getFinalUrl(url), {
      method: 'POST',
      body,
    });
  }
}

export default HttpService;
