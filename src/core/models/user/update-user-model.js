class UpdateUserModel {
  constructor(username = "", name = "", email = "", mobile = "") {
    this.username = username;
    this.name = name;
    this.email = email;
    this.mobile = mobile;
  }
}

export default UpdateUserModel;