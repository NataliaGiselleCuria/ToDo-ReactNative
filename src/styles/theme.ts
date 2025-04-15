export const DefaultTheme = {
  id: "default",
  name: "Tema Claro",
  colors: {
    background: "#ffffff",
    backgroundTop: "#ffffff",
    text: "#383838",
    cardText: "#ffffff",
    cardColors: ["#a7b85c", "#e4e378", "#e5b463", "#dc9b7c", "#a77fad"],
    shadow: "#787878",
    line: "#C3C1BE",
    buttonColor:"#6c8dc4"
  },
};

export const DarkTheme = {
  id: "darkTheme",
  name: "Tema Oscuro",
  colors: {
    background: "#383838",
    backgroundTop: "#343434",
    text: "#ffffff",
    cardText: "#383838",
    cardColors: ["#a7b85c", "#e4e378", "#e5b463", "#dc9b7c", "#a77fad"],
    shadow: "#000", 
    line: "#C3C1BE",
    buttonColor:"#6c8dc4"
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
    cardText: "#ffffff",
    cardColors: ["#8b9bea", "#3f79ba", "#3a4e9a", "#003862", "#333366"],
    shadow: "#000",
    line: "#C3C1BE",
    buttonColor:"#6c8dc4"
  },
};

export const SunsetTheme = {
  id: "sunset",
  name: "Atardecer",
  colors: {
    background: "#2e0232",
    backgroundTop: "#28022b",
    text: "#ffffff",
    cardText: "#2e0232",
    cardColors: ["#f0e243", "#e0a21c", "#ce6b03", "#ac474c", "#8d3355"],
    shadow: "#000",
    line: "#C3C1BE",
    buttonColor:"#6c8dc4"
  },
};

export const NaturalTheme = {
  id: "natural",
  name: "Natural",
  colors: {
    background: "#ddd5c7",
    backgroundTop: "#d8cebd",
    text: "#5b400c",
    cardText: "#5b400c",
    cardColors: ["#6b6f5e", "#9c997a", "#bea373", "#7e562f", "#5b400c"],
    shadow: "#787878",
    line: "#767473",
    buttonColor:"#6c8dc4"
  },
};

export const PastelTheme = {
  id: "pastel",
  name: "Pastel",
  colors: {
    background: "#F1EDEF",
    backgroundTop: "#e6e0e4",
    text: "#383838",
    cardText: "#383838",
    cardColors: ["#b5bc95", "#dfdea7", "#e4cba0", "#dcb09a", "#c2adc5"],
    shadow: "#787878",
    line: "#C3C1BE",
    buttonColor:"#6c8dc4"
  },
};

export const Eva01Theme = {
  id: "eva01",
  name: "Eva01",
  colors: {
    background: "#2f2932",
    backgroundTop: "#2b262e",
    text: "#ffffff",
    cardText: "#2f2932",
    cardColors: ["#466b5a", "#a0de59", "#f5c024", "#a976c3", "#5f2a62"],
    shadow: "#000",
    line: "#C3C1BE",
    buttonColor:"#6c8dc4"
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