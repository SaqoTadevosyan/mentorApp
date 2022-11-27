import { IUser } from "./IProfile";

export enum GenderEnum {
  Male = "Male",
  Female = "Female",
}

export interface IEmployer extends IUser {
  email: string;
  gender: GenderEnum;
}

export interface IGroup {
  groupName: string;
  employees: IEmployer[];
  id: string;
}
