import { Model, property, model, pushKey, hasMany } from 'firemodel';
import { IDictionary, datetime, fk, uri } from 'common-types';
import {
  INPMScore,
  INPMEvaluation,
  IGithubIssues,
  IDistributionElement,
  IGithubUserReference
} from './index';
import { FirebaseBoolean } from 'abstracted-firebase';
import { User } from '@/models/User';

export interface IGithubProperties {
  homepage: uri;
  starsCount: number;
  forksCount: number;
  subscribersCount: number;
  issues: IGithubIssues;
  contributors: Array<IGithubUserReference & { commitsCount: number }>;
  /** last week, month, 3 months, 6 months, year */
  commits: [
    {
      from: datetime;
      to: datetime;
      count: number;
    }
  ];
}

export interface IContributors extends User {
  commitsCount: number;
}

@model({})
export class Package extends Model {
  @property public name!: string;
  /** string representation of a semver version number */
  @property public version!: string;
  @property public description!: string;
  /** the keywords set in the package.json */
  @property public keywords!: string[];
  /** the keywords being used on the site */
  @property public mappedKeywords!: string[];
  @property public license!: string;

  /** NPM based scoring values */
  @property public score!: INPMScore;
  @property public evaluation!: INPMEvaluation;

  @property public gitRepositoryUrl!: string;
  @property public gitRepositoryName!: string;
  @property public gitRepositoryOrg!: string;

  @property public issues!: IGithubIssues;
  /** gives a stream of updates to issue statuses */
  @property public issueEventsUrl!: string;

  @property
  public links!: {
    npm: string;
    repo: string;
    homepage: string;
    bugs: string;
  };

  @property public author!: User;
  @property public owner!: User;
  @property public publisher!: User;
  /** the contributors to the project; keyed with the "username" property from NPMS */
  @property public contributors!: IDictionary<IContributors>;
  /** the maintainers to the project; keyed with the "username" property from NPMS */
  @property public maintainers!: IDictionary<User>;

  @property public commits!: IDictionary<IDistributionElement>;
  @property public npmDownloads!: IDistributionElement[];
  @property public npmReleases!: IDictionary<IDistributionElement>;

  /** The package.json suggests there is a CommonJS module implementation */
  @property public hasCommonJS!: FirebaseBoolean;
  /** The package.json suggests there is an AMD module implementation */
  @property public hasAMD!: FirebaseBoolean;
  /** The package.json suggests there is a ES2015 module implementation */
  @property public hasEs2015!: FirebaseBoolean;
  /** there is a reference in package.json to a Typings entrypoint */
  @property public hasTypings!: FirebaseBoolean;
  /** the repo owner has added a "vue-component" section in their package.json */
  @property public hasVueComponentDefinition!: FirebaseBoolean;

  /** The component's dependencies */
  @property public dependencies!: IDictionary<string>;

  @property public docsURL?: string;
  @property public demoURL?: string;
  @property public sandboxURL?: string;

  @property public starsCount?: number;
  @property public subscriberCount?: number;
  @property public follower?: number;
  @property public forksCount!: number;

  @property public isFork?: boolean;
}
