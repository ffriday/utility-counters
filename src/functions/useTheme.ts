import { useColors } from "vuestic-ui";
import { computed } from "vue";

export const useTheme = () => {
  const { currentPresetName } = useColors();

  const headerColors = computed(() => {
    if (currentPresetName.value === "light") {
      return {
        color: "#111111",
        textColor: "#BAFFC5",
      };
    } else {
      return {
        color: "#FBCAF6",
        textColor: "#481269",
      };
    }
  });

  return { headerColors }
}