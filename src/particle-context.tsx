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
  birthTime: number;
  lifeTime: number;

  constructor(pos, vel, { color, lifeTime }) {
    this.pos = pos;
    this.vel = vel;
    this.color = color;
    this.birthTime = Date.now();
    this.lifeTime = lifeTime;
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
  const [particles, setParticles] = useState([]);
  const [renderCycle, setRenderCycle] = useState(0);

  const addParticle = useCallback(
    (p: Particle) => {
      setParticles((pList) => [...pList, p]);
    },
    [setParticles]
  );

  const move = useCallback((pList) => {
    pList.forEach((p) => {
      p.pos.add(p.vel);
    });
  }, []);

  const kill = useCallback(
    (pList: Particle[]) => {
      const zero = new Victor(0, 0);
      return pList.filter((p) => {
        return p.pos.distance(zero) < screenRadius;
      });
    },
    [screenRadius]
  );

  const lifeLimiter = (pList: Particle[]) => {
    return pList.filter((p) => {
      let age = Date.now() - p.birthTime;
      return age < p.lifeTime;
    });
  };

  const loop = useCallback(() => {
    let pList = [...particles];
    move(pList);
    pList = kill(pList);
    pList = lifeLimiter(pList);
    setParticles(pList);
    setRenderCycle(renderCycle + 1);
  }, [particles, renderCycle, kill, move]);

  useEffect(() => {
    const timer = setInterval(loop, 16);
    return () => clearInterval(timer);
  }, [particles, loop]);

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
