import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Victor from "victor";

export class Particle {
  pos: Victor;
  vel: Victor;
  color: string;

  constructor(pos, vel, color: string) {
    this.pos = pos;
    this.vel = vel;
    this.color = color;
  }
}

export interface IParticleContext {
  particles: Particle[];
  setParticles: (a: Array<Particle>) => void;
  addParticle: (Particle) => void;
  renderCycle: number;
}

export const ParticleContext = React.createContext({} as IParticleContext);

export function useParticles() {
  const context = useContext(ParticleContext);
  return context;
}

export function ParticleProvider({ children }) {
  const screenX = window.innerWidth / 2;
  const screenY = window.innerHeight / 2;
  const screenRadius = Math.max(screenX, screenY);
  const zero = new Victor(0, 0);
  const [particles, setParticles] = useState([]);
  const [renderCycle, setRenderCycle] = useState(0);

  const addParticle = (p: Particle) => {
    setParticles((pList) => [...pList, p]);
  };

  const move = (pList) => {
    pList.forEach((p) => {
      p.pos.add(p.vel);
    });
  };
  const kill = (pList) => {
    return pList.filter((p) => {
      return p.pos.distance(zero) < screenRadius;
    });
  };

  const loop = () => {
    let pList = [...particles];
    move(pList);
    pList = kill(pList);
    setParticles(pList);
    setRenderCycle(renderCycle + 1);
  };

  useEffect(() => {
    const timer = setInterval(loop, 16);
    return () => clearInterval(timer);
  }, [particles]);

  const value = { particles, setParticles, addParticle, renderCycle };
  return (
    <ParticleContext.Provider value={value}>
      {children}
    </ParticleContext.Provider>
  );
}

export function ShowParticles() {
  const { particles } = useParticles();
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  return (
    <Fragment>
      {particles.map((p, index) => (
        <rect
          key={index}
          x={centerX + p.pos.x}
          y={centerY + p.pos.y}
          width="10"
          height="10"
          rx="5"
          fill={"#" + p.color}
        />
      ))}
    </Fragment>
  );
}
