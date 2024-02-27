import { MyRoutes } from '@/constants'

type NavLink = {
  title: string,
  link: MyRoutes,
}

export const navLinks = (isLogged: boolean) => {
  const authLinks: NavLink[] = [
    { title: 'ДОБАВИТЬ ПОКАЗАНИЯ', link: MyRoutes.add },
    { title: 'АРХИВ', link: MyRoutes.archive },
    { title: 'ВЫХОД', link: MyRoutes.logout }
  ]
  const anonLinks: NavLink[] = [
    { title: 'ВХОД', link: MyRoutes.login },
  ]
  return isLogged ? authLinks : anonLinks;
}