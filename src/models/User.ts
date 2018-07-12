// tslint:disable:variable-name
import { Model, property, model } from 'firemodel';

@model({})
export class User extends Model {
  @property public id!: string;
  @property public name?: string;
  @property public email?: string;
  @property public avatar_url!: string;
  @property public user_url!: string;
  @property public company?: string;
  @property public blog?: string;
  @property public bio?: string;
  @property public location?: string;
  /** involvement in other vue-components packages */
  @property
  public involvement?: {
    author?: string[];
    contributor?: string[];
    maintainer?: string[];
  };

  @property public isVueUser: string;
  @property public favorites: string[];

}
