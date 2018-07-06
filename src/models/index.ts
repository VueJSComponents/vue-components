import { datetime, IDictionary } from '../../../common-types/dist';

export interface INPMSection {
  /** a dot-notated path off of root which is being targetted */
  path: string;
  /** if the last part of the path is an array of hashes, specify the property which is serving as the ID */
  arrayIdProp?: string;
  /**
   * if the last part of the path is an array of hashes, specify the
   * value of the ID which will have properties added to
   */
  arrayIdValue?: string;
}

export interface IGitHubRepoMap {
  npmPackage: string;
  githubRepo: string;
  githubOrg: string;
  sections: INPMSection[];
}

export interface IGithubIssues {
  count: number;
  openCount: number;
  distribution: {
    '3600': number,
    '10800': number,
    '32400': number,
    '97200': number,
    '291600': number,
    '874800': number,
    '2624400': number,
    '7873200': number,
    '23619600': number,
    '70858800': number,
    '212576400': number
  };
  isDisabled: boolean;
}

export interface IDistributionElement {
  from: datetime;
  to: datetime;
  count: number;
  label?: string;
}

export interface IGithubUserReference {
  name?: string;
  email?: string;
  username?: string;
}

export interface INPMSDetail {
  analyzedAt: datetime;
  collected: {
    metadata: {
      name: string,
      scope: string,
      version: string,
      description: string,
      keywords: string[],
      date: datetime,
      author: {
        name?: string,
        email?: string,
        username?: string
      },
      publisher: IGithubUserReference,
      maintainers: IGithubUserReference[],
      repository: {
        /** typically should be "git" */
        type: string,
        /** URL to github repo */
        url: string,
        /** e.g., { npm: "https://www.npmjs.com/package/typed-template" } */
        links: IDictionary<string>
      },
      dependencies?: IDictionary<string>,
      devDevpendencies?: IDictionary<string>,
      license: string,
      releases: [
        {
          from: datetime,
          to: datetime,
          count: number
        }
      ],
      hasTestScript: boolean,
      hasSelectiveFiles: boolean,
      readme: string
    },
    npm: {
      downloads: [
        {
          from: datetime,
          to: datetime,
          count: number
        }
      ],
      dependentsCount: number,
      starsCount: number
    },
    github: {
      homepage: string,
      starsCount: number,
      forksCount: number,
      subscribersCount: number,
      issues: IGithubIssues,
      contributors: [
        {
          username: string,
          commitsCount: number
        }
      ],
      commits: IDistributionElement[]
    },
    source: {
      files: {
        readmeSize: number,
        testsSize: number
      },
      badges: [
        {
          urls: IDictionary<string>,
          info: {
            /** e.g., travis, coveralls, etc. */
            service: string
          }
        }
      ]
    }
  };
  evaluation: INPMEvaluation;
  score: INPMScore;
}

export interface INPMScore {
  final: number;
  detail: {
    quality: number,
    popularity: number,
    maintenance: number
  };
}

export interface IGithubRepo {
  id: number;
  name: string;
  full_name: string;
  owner: IGithubUser;
  private: boolean;
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_urls: string;
  hooks_urls: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: datetime;
  updated_at: datetime;
  pushed_at: datetime;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  language: string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  archived: boolean;
  mirrored_url: string;
  open_issues_count: number;
  license: {
    key: string,
    name: string,
    spdx_id: string,
    url: string
  };
  organization: IGithubUser;
  network_count: number;
  subscribers_count: number;
  default_branch: string;
  open_issues: number;
  watchers: number;
  forks: number;
}

export interface IGithubUser {
  login: string;
  id: number;
  company: string;
  bio: string;
  blog: string;
  location: string;
  avatar_url: string;
  gravatar_url: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: 'User' | 'Organization';
  site_admin: boolean;
}

export interface INPMEvaluation {
  quality: {
    carefulness: number,
    tests: number,
    health: number,
    branding: number
  };
  popularity: {
    communityInterest: number,
    downloadsCount: number,
    downloadsAcceleration: number,
    dependentsCount: number
  };
  maintenance: {
    releasesFrequency: number,
    commitsFrequency: number,
    openIssues: number,
    issuesDistribution: number
  };
}
