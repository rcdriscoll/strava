let accessToken = null;

export function saveToken(token) {
  accessToken = token;
}

export function getToken() {
  return accessToken;
}