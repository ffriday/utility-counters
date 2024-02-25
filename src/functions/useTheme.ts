import { ref } from 'vue';

enum LSTheme {
  key = 'theme',
  light = 'light',
  dark = 'dark',
}

enum ColorTheme {
  dark = '#1f165f',
  light = '#ebf6f8'
}

const loadTheme = () => {
  const saved = window.localStorage.getItem(LSTheme.key);
  if (saved) return saved === LSTheme.dark;
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return true;
  return false;
}

export const useTheme = () => {
  const isThemeDark = ref(loadTheme())
  const theme = ref({
    color: isThemeDark.value ? ColorTheme.light : ColorTheme.dark,
    background: isThemeDark.value ? ColorTheme.dark : ColorTheme.light,
  })
  const toggleTheme = () => {
    isThemeDark.value = !isThemeDark.value;
    theme.value.color = isThemeDark.value ? ColorTheme.light : ColorTheme.dark;
    theme.value.background = isThemeDark.value ? ColorTheme.dark : ColorTheme.light;
    window.localStorage.setItem(LSTheme.key, isThemeDark.value ? LSTheme.dark : LSTheme.light)
  }

  return { theme, toggleTheme }
}