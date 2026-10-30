import API_BASE_URL from '../config/api';

let refreshPromise = null;

const clearAuthSession = () => {
  localStorage.removeItem('saga_user');
  localStorage.removeItem('saga_access_token');
  localStorage.removeItem('saga_refresh_token');
};

const refreshAccessToken = async () => {
  const refreshToken =
    localStorage.getItem('saga_refresh_token');

  if (!refreshToken) {
    throw new Error('SESSION_EXPIRED');
  }

  const response = await fetch(
    `${API_BASE_URL}/api/auth/refresh`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        refreshToken,
      }),
    }
  );

  const result = await response.json();

  if (
    !response.ok ||
    !result.success ||
    !result?.data?.accessToken
  ) {
    clearAuthSession();
    throw new Error('SESSION_EXPIRED');
  }

  localStorage.setItem(
    'saga_access_token',
    result.data.accessToken
  );

  if (result.data.refreshToken) {
    localStorage.setItem(
      'saga_refresh_token',
      result.data.refreshToken
    );
  }

  return result.data.accessToken;
};

const getFreshAccessToken = async () => {
  if (!refreshPromise) {
    refreshPromise = refreshAccessToken().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
};

export const authFetch = async (url, options = {}) => {
  let accessToken =
    localStorage.getItem('saga_access_token');

  const makeRequest = (token) => {
    const headers = new Headers(
      options.headers || {}
    );

    headers.set('Accept', 'application/json');

    if (token) {
      headers.set(
        'Authorization',
        `Bearer ${token}`
      );
    }

    return fetch(url, {
      ...options,
      headers,
    });
  };

  let response = await makeRequest(accessToken);

  if (response.status !== 401) {
    return response;
  }

  try {
    accessToken = await getFreshAccessToken();
  } catch {
    clearAuthSession();
    throw new Error('SESSION_EXPIRED');
  }

  response = await makeRequest(accessToken);

  return response;
};

export default authFetch;
