export default class UserModel {
  constructor(
    firstName,
    lastName,
    email,
    mobile,
    role,
    userName,
    password,
    addedDate
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.mobile = mobile;
    this.role = role;
    this.userName = userName;
    this.password = password;
    this.addedDate = addedDate ? new Date(addedDate) : new Date();
  }
}
