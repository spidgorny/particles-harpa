import React, { useContext } from "react";
import "./App.css";
import { Emitter } from "./particles/emitter";
import {
  ParticleContext,
  ParticleProvider,
  ShowParticles,
} from "./particles/particle-context";
import {ParticleSvg} from "./particles/particle-svg";

function App() {
  return (
    <div className="App" style={{ overflow: "hidden" }}>
      <ParticleProvider>
        <ParticleSvg>
            <ShowParticles />
            <Emitter x={0} y={0} />
        </ParticleSvg>
        <Debug />
      </ParticleProvider>
    </div>
  );
}

export default App;

export function Debug() {
  const { particles, renderCycle } = useContext(ParticleContext);
  return (
    <div className="absolute">
      Particles: {particles.length}, RC: {renderCycle}
    </div>
  );
}
