"use client"

import { useEffect } from 'react';
import { metadata } from './metadata';
import localFont from "next/font/local";
import ClientLayout from './ClientLayout';
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Layout({ children }) {
  {/* ============================= Snow Theme ============================= */}
  useEffect(() => {
    const canvas = document.getElementById("town");
    const ctx = canvas.getContext("2d");
    const W = canvas.width = window.innerWidth;
    const H = canvas.height = window.innerHeight;
    const maxParticles = 50;
    const maxParticleSize = 8;
    const minParticleSize = 2;
    const maxMove = 1;
    let angle = 0;
    const particles = [];

    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        wh: Math.random() * maxParticleSize + minParticleSize
      });
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.beginPath();
      for (let i = 0; i < maxParticles; i++) {
        const p = particles[i];
        ctx.moveTo(p.x, p.y);
        ctx.rect(p.x, p.y, p.wh, p.wh);
        const radgrad = ctx.createRadialGradient(p.x + p.wh / 2, p.y + p.wh / 2, 0, p.x + p.wh / 2, p.y + p.wh / 2, p.wh / 2);
        radgrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        radgrad.addColorStop(0.5, 'rgba(255, 255, 255, .8)');
        radgrad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = radgrad;
        ctx.fill();
      }
      update();
    }

    function update() {
      angle += 0.01;
      for (let i = 0; i < maxParticles; i++) {
        const p = particles[i];
        p.y += Math.cos(angle) + p.wh / 4;
        p.x += Math.sin(angle) * 2;
        if (p.x > W + maxMove || p.x < -maxMove || p.y > H) {
          if (i % 3 > 0) {
            particles[i] = { x: Math.random() * W, y: -(maxMove), wh: p.wh };
          } else {
            if (Math.sin(angle) > 0) {
              particles[i] = { x: -maxMove, y: Math.random() * H, wh: p.wh };
            } else {
              particles[i] = { x: W + maxMove, y: Math.random() * H, wh: p.wh };
            }
          }
        }
      }
      requestAnimationFrame(draw);
    }

    draw();
    return () => {
      ctx.clearRect(0, 0, W, H);
    };
  }, []);

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className="flex flex-col min-h-screen relative">
        <canvas id="town" className="absolute top-0 left-0 w-full h-full pointer-events-none"></canvas>
        {/* ============================= Navigation ============================= */}
        <header className="bg-[#3498DB] text-[#2C3E50] p-4 relative z-10">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">Mall Royalty Program</h1>
            <nav>
              <ul className="flex space-x-4">
                <li><a href="/" className="hover:text-[#ffffff] font-bold">Home</a></li>
                <li><a href="/login" className="hover:text-[#ffffff] font-bold">Login</a></li>
                <li><a href="/register" className="hover:text-[#ffffff] font-bold">Register</a></li>
              </ul>
            </nav>
          </div>
        </header>

        {/* ============================= Main Content ============================= */}
        <main className="flex-grow container mx-auto p-4 relative z-10">
          <ClientLayout>{children}</ClientLayout>
        </main>

        {/* ============================= Footer =============================*/}
        <footer className="bg-[#3498DB] text-[#2C3E50] text-center p-4 relative z-10">
          <p>&copy; 2024 Mall Royalty Program. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}