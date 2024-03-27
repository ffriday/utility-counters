export enum MyRoutes {
  home = 'home',
  login = 'login',
  logout = 'logout',
  register = 'register',
  add = 'add',
  archive = 'archive',
  notFound = 'not-found',
  apart = 'apart'
}

export enum DBPaths {
  users = 'users',
  month = 'month',
  year = 'year',
  apart = 'apart',
}

export type Counters = {
  electricity: number;
  coldWater: number;
  hotWater: number;
}

export type Apart = {
  name: string;
  owner: string;
  link: string;
  shared: boolean;
}

export type ApartDoc = Apart & {
  id: string;
  key: string;
}