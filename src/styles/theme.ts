import { CategoriesList, PermissionsOptions } from "../types/types";

const assignCategoryColors = (cardColors: string[]) => ({
  [CategoriesList.shopping]: cardColors[0],
  [CategoriesList.gift]: cardColors[1],
  [CategoriesList.task]: cardColors[2],
  [CategoriesList.others]: cardColors[3],
});

const assignPermissionsColors = (cardColors: string[]) => ({
  [PermissionsOptions.onlyMe]: cardColors[0],
  [PermissionsOptions.all]: cardColors[1],
  [PermissionsOptions.some]: cardColors[2],
});

export const DefaultTheme = {
  id: "default",
  name: "Tema Claro",
  colors: {
    background: "#ffffff",
    backgroundTop: "#ffffff",
    text: "#383838",
    textSecondary: 'rgba(97,97,99,1)',
    buttonColor: "#6c8dc4",
    cardText: "#ffffff",
    cardColors: ["#a7b85c", "#9884B4", "#e5b463", "#dc9b7c", "#a77fad"],
    categoryColors: assignCategoryColors(["#a7b85c", "#9884B4", "#e5b463", "#dc9b7c", "#a77fad"]),
    permissionsColors: assignPermissionsColors(["#a7b85c", "#9884B4", "#e5b463"]),
    shadow: 'rgb(42, 42, 43)',
    line: "#C3C1BE",
    
  },
};

export const DarkTheme = {
  id: "darkTheme",
  name: "Tema Oscuro",
  colors: {
    background: "#383838",
    backgroundTop: "#343434",
    text: "#ffffff",
    textSecondary: 'rgb(139, 139, 139)',
    buttonColor: "#6c8dc4",
    cardText: "#383838",
    cardColors: ["#a7b85c", "#9884B4", "#e5b463", "#dc9b7c", "#a77fad"],
    categoryColors: assignCategoryColors(["#a7b85c", "#9884B4", "#e5b463", "#dc9b7c", "#a77fad"]),
    permissionsColors: assignPermissionsColors(["#a7b85c", "#9884B4", "#e5b463"]),
    shadow: "#000",
    line: "rgb(139, 139, 139)",

    //elegir color para los botones focuseados del footer
    //elegir color para el borde del avatar (el mismo se usará para el id??)
    //elegir color para el efecto press in de los items del drawer.
  },
};


export const NightSkyTheme = {
  id: "nightSky",
  name: "Cielo Nocturno",
  colors: {
    background: "#292e47",
    backgroundTop: "#272b43",
    text: "#ffffff",
    textSecondary: 'rgba(97,97,99,1)',
    buttonColor: "#6c8dc4",
    cardText: "#ffffff",
    cardColors: ["#8b9bea", "#3f79ba", "#3a4e9a", "#003862", "#333366"],
    shadow: "#000",
    line: "#C3C1BE",

  },
};

export const SunsetTheme = {
  id: "sunset",
  name: "Atardecer",
  colors: {
    background: "#2e0232",
    backgroundTop: "#28022b",
    text: "#ffffff",
    textSecondary: 'rgba(97,97,99,1)',
    buttonColor: "#6c8dc4",
    cardText: "#2e0232",
    cardColors: ["#f0e243", "#e0a21c", "#ce6b03", "#ac474c", "#8d3355"],
    shadow: "#000",
    line: "#C3C1BE",

  },
};

export const NaturalTheme = {
  id: "natural",
  name: "Natural",
  colors: {
    background: "#ddd5c7",
    backgroundTop: "#d8cebd",
    text: "#383838",
    textSecondary: 'rgba(97,97,99,1)',
    buttonColor: "#6c8dc4",
    cardText: "#5b400c",
    cardColors: ["#6b6f5e", "#9c997a", "#bea373", "#7e562f", "#5b400c"],
    shadow: "#787878",
    line: "#767473",

  },
};

export const PastelTheme = {
  id: "pastel",
  name: "Pastel",
  colors: {
    background: "#F1EDEF",
    backgroundTop: "#e6e0e4",
    text: "#383838",
    textSecondary: 'rgba(97,97,99,1)',
    buttonColor: "#6c8dc4",
    cardText: "#383838",
    cardColors: ["#b5bc95", "#dfdea7", "#e4cba0", "#dcb09a", "#c2adc5"],
    shadow: "#787878",
    line: "#C3C1BE",

  },
};

export const Eva01Theme = {
  id: "eva01",
  name: "Eva01",
  colors: {
    background: "#2f2932",
    backgroundTop: "#2b262e",
    text: "#ffffff",
    textSecondary: 'rgba(97,97,99,1)',
    buttonColor: "#6c8dc4",
    cardText: "#2f2932",
    cardColors: ["#466b5a", "#a0de59", "#f5c024", "#a976c3", "#5f2a62"],
    shadow: "#000",
    line: "#C3C1BE",

  },
};

export const themes = {
  default: DefaultTheme,
  darkTheme: DarkTheme,
  nightSky: NightSkyTheme,
  sunset: SunsetTheme,
  natural: NaturalTheme,
  pastel: PastelTheme,
  eva01: Eva01Theme,
};