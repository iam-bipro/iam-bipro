"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const SPRING_CONFIG = { stiffness: 180, damping: 22, mass: 0.6 };

function useIstClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const format = () => {
      setTime(
        `${new Intl.DateTimeFormat("en-IN", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata",
        }).format(new Date())} IST`,
      );
    };
    format();
    const interval = window.setInterval(format, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return time;
}

function AvatarOrb() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
    } catch {
      canvas.classList.add("profile-orb-fallback");
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
    camera.position.z = 3.4;
    const geometry = new THREE.SphereGeometry(0.92, 32, 24);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x9d8bd8,
      emissive: 0x251d4a,
      emissiveIntensity: 0.22,
      metalness: 0.2,
      roughness: 0.1,
      transmission: 0.68,
      thickness: 0.7,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      transparent: true,
      opacity: 0.9,
    });
    const orb = new THREE.Mesh(geometry, material);
    scene.add(orb);

    const rim = new THREE.Mesh(
      new THREE.SphereGeometry(0.94, 32, 24),
      new THREE.MeshBasicMaterial({
        color: 0xb8c3ff,
        wireframe: true,
        transparent: true,
        opacity: 0.22,
      }),
    );
    scene.add(rim);

    scene.add(new THREE.AmbientLight(0x929dff, 1.5));
    const keyLight = new THREE.PointLight(0xffb5df, 5, 6);
    keyLight.position.set(-2, 2, 3);
    scene.add(keyLight);
    const fillLight = new THREE.PointLight(0x7d9dff, 4, 5);
    fillLight.position.set(2, -1, 2);
    scene.add(fillLight);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(144, 144, false);

    let frame = 0;
    const animate = () => {
      orb.rotation.y += 0.004;
      rim.rotation.y -= 0.002;
      orb.rotation.x += (pointer.current.y * 0.18 - orb.rotation.x) * 0.04;
      orb.rotation.z += (pointer.current.x * 0.12 - orb.rotation.z) * 0.04;
      rim.rotation.x = orb.rotation.x;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.current.x = (event.clientX - (bounds.left + bounds.width / 2)) / bounds.width;
      pointer.current.y = (event.clientY - (bounds.top + bounds.height / 2)) / bounds.height;
    };
    canvas.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      canvas.removeEventListener("pointermove", handlePointerMove);
      geometry.dispose();
      material.dispose();
      rim.geometry.dispose();
      rim.material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="profile-orb">
      <canvas ref={canvasRef} aria-hidden="true" />
      <span className="profile-orb-initials">BN</span>
      <span className="profile-orb-sheen" />
    </div>
  );
}

export default function ProfileCard() {
  const clock = useIstClock();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(pointerY, SPRING_CONFIG);
  const rotateY = useSpring(pointerX, SPRING_CONFIG);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 7);
    pointerY.set(-((event.clientY - bounds.top) / bounds.height - 0.5) * 7);
  };

  const resetTilt = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.div
      className="profile-widget"
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
    >
      <div className="profile-widget-sheen" />
      <div className="profile-widget-header">
        <span className="profile-location">
          <span className="profile-status-dot"><span /></span>
          ICHHAPUR · INDIA
        </span>
      </div>
      <div className="profile-clock">{clock}</div>
      <AvatarOrb />
      <div className="profile-widget-name">Bipradip Nandy</div>
      <div className="profile-widget-role">Full-Stack Web Developer &amp; CSE Student</div>
      <div className="profile-badges">
        <span>KGEC CSE</span>
        <span>Real-Time Architecture</span>
        <span>Top 3 MLH</span>
      </div>
    </motion.div>
  );
}
