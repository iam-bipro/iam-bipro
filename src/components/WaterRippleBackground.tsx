"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const SIMULATION_SIZE = 256;
const MAX_PIXEL_RATIO = 1.5;
const FRAME_INTERVAL = 1000 / 60;

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const simulationShader = `
  precision mediump float;

  uniform sampler2D uState;
  uniform vec2 uTexel;
  uniform vec2 uPointer;
  uniform float uPointerStrength;
  uniform float uPointerRadius;
  varying vec2 vUv;

  void main() {
    vec4 state = texture2D(uState, vUv);
    float height = state.r;
    float velocity = state.g;
    float left = texture2D(uState, vUv - vec2(uTexel.x, 0.0)).r;
    float right = texture2D(uState, vUv + vec2(uTexel.x, 0.0)).r;
    float down = texture2D(uState, vUv - vec2(0.0, uTexel.y)).r;
    float up = texture2D(uState, vUv + vec2(0.0, uTexel.y)).r;
    float laplacian = left + right + down + up - height * 4.0;
    float distanceToPointer = distance(vUv, uPointer);
    float impulse = exp(-pow(distanceToPointer / uPointerRadius, 2.0)) * uPointerStrength;

    velocity += laplacian * 0.20;
    velocity *= 0.982;
    velocity += impulse;
    height += velocity;
    height *= 0.999;

    gl_FragColor = vec4(height, velocity, 0.0, 1.0);
  }
`;

const displayShader = `
  precision mediump float;

  uniform sampler2D uSimulation;
  uniform vec2 uSimulationTexel;
  uniform vec2 uResolution;
  varying vec2 vUv;

  void main() {
    float height = texture2D(uSimulation, vUv).r;
    float left = texture2D(uSimulation, vUv - vec2(uSimulationTexel.x, 0.0)).r;
    float right = texture2D(uSimulation, vUv + vec2(uSimulationTexel.x, 0.0)).r;
    float down = texture2D(uSimulation, vUv - vec2(0.0, uSimulationTexel.y)).r;
    float up = texture2D(uSimulation, vUv + vec2(0.0, uSimulationTexel.y)).r;
    vec2 normal = vec2(left - right, down - up) * 2.6;
    vec2 uv = vUv + normal * 0.018;
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    float blueGlow = smoothstep(0.95, 0.05, distance(uv, vec2(0.20, 0.20)));
    float violetGlow = smoothstep(0.85, 0.05, distance(uv, vec2(0.90, 0.72)));
    float cyanGlow = smoothstep(0.72, 0.02, distance(uv, vec2(0.05, 0.82)));
    float surfaceLight = height * 2.4 + dot(normal, vec2(0.65, 0.8));
    vec3 color = vec3(0.035, 0.035, 0.075);
    color += vec3(0.10, 0.14, 0.35) * blueGlow * 0.8;
    color += vec3(0.30, 0.08, 0.30) * violetGlow * 0.6;
    color += vec3(0.05, 0.24, 0.38) * cyanGlow * 0.55;
    color += vec3(0.10, 0.13, 0.30) * surfaceLight;
    color += vec3(0.04, 0.05, 0.12) * aspect.x;

    gl_FragColor = vec4(color, 0.94);
  }
`;

function isInteractiveTarget(target: EventTarget | null) {
  return target instanceof Element && Boolean(
    target.closest("nav, .app-dock, a, button, .glass-card, .marquee-row, footer"),
  );
}

export default function WaterRippleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO));

    const camera = new THREE.Camera();
    const simulationScene = new THREE.Scene();
    const displayScene = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry(2, 2);
    const simulationTexel = new THREE.Vector2(1 / SIMULATION_SIZE, 1 / SIMULATION_SIZE);
    const resolution = new THREE.Vector2();
    const pointerTarget = new THREE.Vector2(0.5, 0.5);
    const pointerCurrent = new THREE.Vector2(0.5, 0.5);
    const simulationPointer = new THREE.Vector2(0.5, 0.5);
    const currentPointerStrength = { value: 0 };
    const targetPointerStrength = { value: 0 };

    const createTarget = () => new THREE.WebGLRenderTarget(SIMULATION_SIZE, SIMULATION_SIZE, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping,
      format: THREE.RGBAFormat,
      type: THREE.HalfFloatType,
      depthBuffer: false,
      stencilBuffer: false,
    });

    let readTarget = createTarget();
    let writeTarget = createTarget();
    const clearTarget = (target: THREE.WebGLRenderTarget) => {
      renderer.setRenderTarget(target);
      renderer.clear();
    };
    clearTarget(readTarget);
    clearTarget(writeTarget);
    renderer.setRenderTarget(null);

    const simulationMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uState: { value: readTarget.texture },
        uTexel: { value: simulationTexel },
        uPointer: { value: simulationPointer },
        uPointerStrength: currentPointerStrength,
        uPointerRadius: { value: 0.06 },
      },
      vertexShader,
      fragmentShader: simulationShader,
    });
    const displayMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uSimulation: { value: readTarget.texture },
        uSimulationTexel: { value: simulationTexel },
        uResolution: { value: resolution },
      },
      vertexShader,
      fragmentShader: displayShader,
      transparent: true,
      depthWrite: false,
    });
    const simulationMesh = new THREE.Mesh(geometry, simulationMaterial);
    const displayMesh = new THREE.Mesh(geometry, displayMaterial);
    simulationScene.add(simulationMesh);
    displayScene.add(displayMesh);

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height, false);
      resolution.set(width, height);
    };

    const updatePointer = (event: PointerEvent, strength: number) => {
      if (isInteractiveTarget(event.target)) return;
      pointerTarget.set(
        THREE.MathUtils.clamp(event.clientX / window.innerWidth, 0, 1),
        THREE.MathUtils.clamp(1 - event.clientY / window.innerHeight, 0, 1),
      );
      targetPointerStrength.value = Math.max(targetPointerStrength.value, strength);
    };
    const handlePointerMove = (event: PointerEvent) => updatePointer(event, 0.008);
    const handlePointerDown = (event: PointerEvent) => updatePointer(
      event,
      event.pointerType === "touch" ? 0.24 : 0.16,
    );

    let animationFrame = 0;
    let previousTime = 0;
    const render = (time: number) => {
      animationFrame = requestAnimationFrame(render);
      if (time - previousTime < FRAME_INTERVAL) return;
      previousTime = time - ((time - previousTime) % FRAME_INTERVAL);

      pointerCurrent.lerp(pointerTarget, 0.16);
      currentPointerStrength.value = THREE.MathUtils.lerp(
        currentPointerStrength.value,
        targetPointerStrength.value,
        0.22,
      );
      targetPointerStrength.value *= 0.88;
      simulationPointer.copy(pointerCurrent);

      simulationMaterial.uniforms.uState.value = readTarget.texture;
      renderer.setRenderTarget(writeTarget);
      renderer.render(simulationScene, camera);
      renderer.setRenderTarget(null);

      const previousRead = readTarget;
      readTarget = writeTarget;
      writeTarget = previousRead;
      displayMaterial.uniforms.uSimulation.value = readTarget.texture;
      renderer.render(displayScene, camera);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    animationFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      geometry.dispose();
      simulationMaterial.dispose();
      displayMaterial.dispose();
      readTarget.dispose();
      writeTarget.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="water-ripple-canvas" aria-hidden="true" />;
}
