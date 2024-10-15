interface IModel {
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface IUser {
  createdAt: string;
  updatedAt: string;
  id: string;
  email: string;
  username: string;
  profilePicture: any;
  password: string;
  activationCode: string;
  phoneNumber: string;
}

export interface UserProfile extends IModel {
  firstName: string;
  lastName: string;
  email: string;
  lastLogin: any;
  gender: string;
  phoneNumber: any;
  nationalId: string;
  visibility: string;
  status: string;
  address: Address;
  profile: Profile;
  currentClass?: any;
  profilePicture: string;
}

export interface Profile extends IModel {
  email: string;
  password: string;
  username: string;
  activationCode: string;
  accountStatus: string;
  profilePicture: string;
  userTypesDTOList: any;
  customRole: any;
}

interface Address extends IModel {
  country: string;
  province: string;
  district: string;
  sector: string;
  cell: string;
  village: string;
}
