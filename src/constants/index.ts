export enum MyRoutes {
  home = 'home',
  login = 'login',
  logout = 'logout',
  register = 'register',
  add = 'add',
  archive = 'archive'
}

export enum DBPaths {
  users = 'users',
  month = 'month',
  year = 'year',
}

export type Counters = {
  electricity: number;
  coldWater: number;
  hotWater: number;
}