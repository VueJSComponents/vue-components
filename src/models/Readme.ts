import { Model, property, model, pushKey, hasMany } from 'firemodel';

@model({ plural: 'readme' })
export class Readme extends Model {
  @property public htmlUrl: string;
  @property public mdUrl: string;
  @property public sha: string;
  @property public html: string;
}
