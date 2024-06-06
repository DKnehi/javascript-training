export default class UserModel {
  constructor(
    id,
    firstName,
    lastName,
    email,
    phoneNumber,
    role,
    userName,
    password,
    addedDate
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.role = role;
    this.userName = userName;
    this.password = password;
    this.addedDate = addedDate ? new Date(addedDate) : new Date();
  }
}
