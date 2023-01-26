import { useEffect } from "react";
import { Particle, useParticles } from "./particle-context";
import Victor from "victor";

export function Emitter({ x, y }) {
  const { particles, addParticle } = useParticles();

  useEffect(() => {
    const timer = setInterval(() => {
      let pos = new Victor(x, y);
      let r1 = Math.random() - 0.5;
      let r2 = Math.random() - 0.5;
      let vel = new Victor(r1, r2);
      let color = Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .substring(0, 6);
      console.log("emit", pos, vel);
      addParticle(new Particle(pos, vel, color));
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return <rect x={x} y={y} color="red" />;
}
