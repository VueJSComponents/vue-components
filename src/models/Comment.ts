import { Model, property, model } from 'firemodel';

@model({})
export class Comment extends Model {
  @property public name!: string;
  /** string representation of a semver version number */
}
