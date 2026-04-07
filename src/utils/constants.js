// src/utils/constants.js

// The base aesthetic for months without a specific festival
export const DEFAULT_THEME = {
  festival: "Standard",
  description: "A month of focus, planning, and new opportunities.",
  // Sample Image for Standard months
  imageUrl: "https://images.unsplash.com/photo-1506744626753-eda8151a7471?q=80&w=2000&auto=format&fit=crop", 
  // We've moved colors directly to the top level
  primary: "bg-blue-600", // Standard blue theme from image_2.png
  text: "text-blue-700",
  border: "border-blue-600",
  hover: "hover:bg-blue-100" // Standard fallback highlight color
};

export const MONTHLY_THEMES = {
  3: {
    monthName: "April",
    festival: "Vaisakhi",
    description: "Celebrating the harvest and the birth of the Khalsa.",
    // Sample Vaisakhi image is now image_3.png
    imageUrl: "assets/bhrt.jpg", // The file path for image_3.png
    primary: "bg-orange-500",
    text: "text-orange-600",
    border: "border-orange-500",
    hover: "hover:bg-orange-100"
  },
  9: {
    monthName: "October",
    festival: "Diwali",
    description: "The festival of lights, light over darkness.",
    imageUrl: "https://images.unsplash.com/photo-1514222005400-305101eb6577?q=80&w=2000&auto=format&fit=crop", 
    primary: "bg-yellow-500",
    text: "text-yellow-600",
    border: "border-yellow-500",
    hover: "hover:bg-yellow-100"
  }
};

export const getThemeForMonth = (monthIndex) => {
  if (MONTHLY_THEMES[monthIndex]) {
    return MONTHLY_THEMES[monthIndex];
  }
  
  const fallbackMonthName = new Date(2026, monthIndex).toLocaleString('default', { month: 'long' });
  
  return {
    ...DEFAULT_THEME,
    monthName: fallbackMonthName
  };
};