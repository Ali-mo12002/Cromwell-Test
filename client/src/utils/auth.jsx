import * as jwt_decode from 'jwt-decode';

class AuthService {
  getProfile() {
    const token = this.getToken();
    return token ? jwt_decode(token) : null;
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  isTokenExpired(token) {
    try {
      const decoded = jwt_decode(token);
      return decoded.exp < Date.now() / 1000; 
    } catch (err) {
      console.log('Error decoding token', err);
      return false;
    }
  }

  login(idToken, user, dispatch) {
    localStorage.setItem('id_token', idToken); 
    dispatch({ type: 'auth/login', payload: { token: idToken, user } }); 


  }

  logout(dispatch) {
    localStorage.removeItem('id_token'); 
    dispatch({ type: 'auth/logout' }); 
    window.location.assign('/'); 
  }
}

export default new AuthService();
