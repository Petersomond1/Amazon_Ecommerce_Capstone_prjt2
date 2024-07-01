export function checkIfUserIsAdmin() {
  const token = document.cookie.split('; ').find(row => row.startsWith('token='));
  if (!token) return false;

  const decodedToken = JSON.parse(atob(token.split('=')[1].split('.')[1]));
  return decodedToken.isAdmin;
}
