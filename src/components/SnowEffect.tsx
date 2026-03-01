import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

interface Snowflake {
  id: number;
  leftStart: string;
  leftEnd: string;
  size: string;
  duration: string;
  delay: string;
  opacity: number;
}

export function SnowEffect() {
  const { theme } = useTheme();
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    if (theme !== "winter" && theme !== "christmas") {
      setSnowflakes([]);
      return;
    }

    // Generate snowflakes
    const count = 50; // Number of snowflakes
    const flakes: Snowflake[] = [];

    for (let i = 0; i < count; i++) {
      flakes.push({
        id: i,
        leftStart: `${Math.random() * 100}vw`,
        leftEnd: `${Math.random() * 100}vw`, // Randomize end position for wind effect
        size: `${Math.random() * 3 + 2}px`, // 2px to 5px
        duration: `${Math.random() * 5 + 5}s`, // 5s to 10s
        delay: `-${Math.random() * 10}s`, // Start immediately at random points
        opacity: Math.random() * 0.5 + 0.3, // 0.3 to 0.8
      });
    }

    setSnowflakes(flakes);
  }, [theme]);

  if (theme !== "winter" && theme !== "christmas") return null;

  return (
    <>
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={
            {
              "--left-start": flake.leftStart,
              "--left-end": flake.leftEnd,
              "--opacity": flake.opacity,
              width: flake.size,
              height: flake.size,
              animationDuration: flake.duration,
              animationDelay: flake.delay,
            } as React.CSSProperties
          }
        />
      ))}
    </>
  );
}
