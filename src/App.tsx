import React, { useCallback, useContext, useState } from "react";
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
        <Debug />
        <svg
          // viewBox="-100 -100 100 100"
          style={{ width: "100vw", height: "100vh", backgroundColor: "#444" }}
        >
          {/*<g transform="matrix(1 0 0 -1 500 500)">*/}
          <ShowParticles />
          {/*</g>*/}
          <Emitter x={0} y={0} />
        </svg>
      </ParticleProvider>
    </div>
  );
}

export default App;

export function Debug() {
  const { particles, renderCycle } = useContext(ParticleContext);
  return (
    <div>
      Particles: {particles.length}, RC: {renderCycle}
    </div>
  );
}
