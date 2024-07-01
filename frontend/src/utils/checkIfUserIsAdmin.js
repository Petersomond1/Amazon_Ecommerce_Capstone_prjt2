export function checkIfUserIsAdmin() {
    const token = localStorage.getItem('token');
    if (!token) return false;
  
    // You would typically decode the token here and check the user's role
    // This is a placeholder implementation
    const user = JSON.parse(atob(token.split('.')[1]));
    return user.isAdmin;
  }