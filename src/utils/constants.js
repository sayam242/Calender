// src/utils/constants.js

export const MONTHLY_THEMES = {
  0: {
    monthName: "January",
    festival: "Lohri",
    description: "Celebrating the winter solstice with warmth and light.",
    imageUrl: "/themes/january.svg",
    primary: "bg-indigo-700",
    primaryHex: "#4338ca",
    text: "text-indigo-800",
    hover: "hover:bg-indigo-50"
  },
  1: {
    monthName: "February",
    festival: "Basant Panchami",
    description: "Welcome the spring with yellow fields and kites.",
    imageUrl: "/themes/february.svg",
    primary: "bg-amber-600",
    primaryHex: "#d97706",
    text: "text-amber-800",
    hover: "hover:bg-amber-50"
  },
  2: {
    monthName: "March",
    festival: "Holi",
    description: "A celebration of colors, love, and new life.",
    imageUrl: "/themes/march.svg",
    primary: "bg-fuchsia-600",
    primaryHex: "#c026d3",
    text: "text-fuchsia-800",
    hover: "hover:bg-fuchsia-50"
  },
  3: {
    monthName: "April",
    festival: "Vaisakhi",
    description: "Celebrating the harvest and the birth of the Khalsa.",
    imageUrl: "/themes/april.svg",
    primary: "bg-orange-700",
    primaryHex: "#c2410c",
    text: "text-orange-800",
    hover: "hover:bg-orange-50"
  },
  4: {
    monthName: "May",
    festival: "Summer Bliss",
    description: "Basking in the golden glow of the long summer days.",
    imageUrl: "/themes/may.svg",
    primary: "bg-yellow-600",
    primaryHex: "#ca8a04",
    text: "text-yellow-800",
    hover: "hover:bg-yellow-50"
  },
  5: {
    monthName: "June",
    festival: "Monsoon Arrival",
    description: "The first rains bringing life to the thirsty earth.",
    imageUrl: "/themes/june.svg",
    primary: "bg-teal-700",
    primaryHex: "#0f766e",
    text: "text-teal-800",
    hover: "hover:bg-teal-50"
  },
  6: {
    monthName: "July",
    festival: "Sawan",
    description: "Lush greens and refreshing showers of peak monsoon.",
    imageUrl: "/themes/july.svg",
    primary: "bg-emerald-700",
    primaryHex: "#047857",
    text: "text-emerald-800",
    hover: "hover:bg-emerald-50"
  },
  7: {
    monthName: "August",
    festival: "Independence",
    description: "Honoring our freedom and the spirit of the nation.",
    imageUrl: "/themes/august.svg",
    primary: "bg-orange-500",
    primaryHex: "#f97316",
    text: "text-orange-700",
    hover: "hover:bg-orange-50"
  },
  8: {
    monthName: "September",
    festival: "Autumn Equinox",
    description: "Nature transitions into a season of gold and sepia.",
    imageUrl: "/themes/september.svg",
    primary: "bg-amber-700",
    primaryHex: "#b45309",
    text: "text-amber-900",
    hover: "hover:bg-amber-50"
  },
  9: {
    monthName: "October",
    festival: "Diwali",
    description: "The festival of lights—victory of light over darkness.",
    imageUrl: "/themes/october.svg",
    primary: "bg-rose-700",
    primaryHex: "#be123c",
    text: "text-rose-800",
    hover: "hover:bg-rose-50"
  },
  10: {
    monthName: "November",
    festival: "Gurpurab",
    description: "A time of peace, enlightenment, and community.",
    imageUrl: "/themes/november.svg",
    primary: "bg-sky-700",
    primaryHex: "#0369a1",
    text: "text-sky-800",
    hover: "hover:bg-sky-50"
  },
  11: {
    monthName: "December",
    festival: "Winter Solstice",
    description: "Cozy nights and the quiet beauty of the winter chill.",
    imageUrl: "/themes/december.svg",
    primary: "bg-slate-700",
    primaryHex: "#334155",
    text: "text-slate-800",
    hover: "hover:bg-slate-50"
  }
};

export const getThemeForMonth = (monthIndex) => {
  return MONTHLY_THEMES[monthIndex] || MONTHLY_THEMES[0];
};

export const DEFAULT_THEME = MONTHLY_THEMES[0];