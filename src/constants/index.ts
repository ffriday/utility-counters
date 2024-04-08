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

export type CounterParams = {
  electricity: number;
  coldWater: number;
  hotWater: number;
  drainage: number;
}

export type Apart = {
  name: string;
  owner: string;
  link: string;
  balance: number;
  shared: boolean;
  tariff: CounterParams;
}

export type ApartDoc = Apart & {
  id: string;
  key: string;
}