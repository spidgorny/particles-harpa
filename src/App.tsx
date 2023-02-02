import React, { useContext } from "react";
import "./App.css";
import { Emitter } from "./emitter";
import {
  ParticleContext,
  ParticleProvider,
  ShowParticles,
} from "./particle-context";

function App() {
  return (
    <div className="App" style={{ overflow: "hidden" }}>
      <ParticleProvider>
        <div className="relative">
          <svg
            style={{ width: "100vw", height: "100vh", backgroundColor: "#444" }}
          >
            <ShowParticles />
            <Emitter x={0} y={0} />
          </svg>
          <Debug />
        </div>
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
