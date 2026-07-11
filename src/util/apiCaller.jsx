import axios from 'axios';
import {isTextFile} from "./utils";
const API_URL = import.meta.env.API_URL;

export async function uploadAttachments(endpoint, formData) {
  try {
    const response = await axios.post(`${API_URL}/${endpoint}`, formData);
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
}

export async function showAttachment(attachment) {
  try {
    const config = {
      responseType: isTextFile(attachment.type) ? 'text' : 'blob',
    };

    const response = await axios.post(`${API_URL}/tools/download`, attachment, config);

    return response.data;
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
}

export async function downloadAttachment(attachment) {
  try {
    const config = {
      responseType: 'blob',
    };

    const response = await axios.post(`${API_URL}/tools/download`, attachment, config);

    return response.data;
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
}

export async function streamAttachment(attachment) {
  try {
    const config = {
      responseType: 'blob',
    };

    const response = await axios.post(`${API_URL}/tools/stream`, attachment, config);

    return response.data;
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
}

export async function client(endpoint, { body, ...customConfig } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  let data;
  try {
    const response = await window.fetch(`${API_URL}/${endpoint}`, config);

    data = await response.json();

    if (response.ok) {
      return {
        status: response.status,
        data,
        headers: response.headers,
        url: response.url,
      };
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data);
  }
}

client.get = function (endpoint, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: 'GET' });
}

client.post = function (endpoint, body, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: 'POST', body });
}

client.put = function (endpoint, body, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: 'PUT', body });
}
