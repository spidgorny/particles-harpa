export function ParticleSvg({children}) {
	return         <div className="relative">
		<svg
			style={{ width: "100vw", height: "100vh", backgroundColor: "#444" }}
		>
			{children}
		</svg>
	</div>
		}
