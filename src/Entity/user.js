class User {
  constructor(email, password, token = null) {
    this.email = email;
    this.password = password;
    this.token = token;
  }
}

export default User;
