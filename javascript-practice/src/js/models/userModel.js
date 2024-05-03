export default class UserModel {
  constructor(
    userId,
    firstName,
    lastName,
    email,
    phoneNumber,
    role,
    userName,
    password,
  ) {
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.role = role;
    this.userName = userName;
    this.password = password;
  }
}
