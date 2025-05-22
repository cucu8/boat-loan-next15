"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  // Bileşen sadece client tarafında mount edildikten sonra render edilir
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // SSR sırasında hiçbir şey render etme

  return (
    <div>
      The current theme is: {theme}
      <button onClick={() => setTheme("light")}>Light Mode</button>
      <button onClick={() => setTheme("dark")}>Dark Mode</button>
    </div>
  );
};
