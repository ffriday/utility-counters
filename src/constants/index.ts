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

export type CounterData = {
  counterParams: CounterParams;
  id: number;
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

export type TariffItem = {
  label: string;
  name: keyof CounterParams;
};

export type TariffItemView = {
  label: string;
  measure: string;
  icon: string;
  name: keyof CounterParams;
};

export const initialCounterParams: CounterParams = {
  electricity: 0,
  coldWater: 0,
  hotWater: 0,
  drainage: 0,
}

export const initialName = 'Моя квартира'

export const tariffList: TariffItem[] = [
  { label: 'Электричество, р/кВт⋅ч', name: 'electricity' },
  { label: 'Холодная вода, р/м3', name: 'coldWater' },
  { label: 'Горячая вода, р/м3', name: 'hotWater' },
  { label: 'Водоотведение, р/m3', name: 'drainage' },
];

export const countersList: TariffItem[] = [
  { label: 'Электричество, кВт⋅ч', name: 'electricity' },
  { label: 'Холодная вода, м3', name: 'coldWater' },
  { label: 'Горячая вода, м3', name: 'hotWater' },
  { label: 'Водоотведение, м3', name: 'drainage' },
];

export const countersListView: TariffItemView[] = [
  { label: 'Электричество, кВт⋅ч', measure: 'кВт⋅ч', name: 'electricity', icon: "electric_bolt" },
  { label: 'Холодная вода, м3', measure: 'м3', name: 'coldWater', icon: "shower" },
  { label: 'Горячая вода, м3', measure: 'м3', name: 'hotWater', icon: "hot_tub" },
  { label: 'Водоотведение, м3', measure: 'м3', name: 'drainage', icon: "plumbing" },
];

export const initialMonthData: (n?: number) => CounterData[] = (n: number = 12) => Array.from({ length: n }, (_, i) => ({ id: i + 1, counterParams: initialCounterParams }))