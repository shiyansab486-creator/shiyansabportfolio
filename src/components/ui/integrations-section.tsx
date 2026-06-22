"use client";

import { GlassEffect } from "@/components/ui/liquid-glass";
import { MagneticButton } from "@/App";
import { TextReveal } from "@/components/ui/cascade-text";
import { Globe, ArrowRight } from "lucide-react";

const integrations = [
  "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  "https://cdn-icons-png.flaticon.com/512/174/174857.png", // LinkedIn
  "https://cdn-icons-png.flaticon.com/512/2111/2111615.png", // Slack
  "https://cdn-icons-png.flaticon.com/512/174/174872.png", // Spotify
  "https://cdn-icons-png.flaticon.com/512/733/733547.png", // Facebook
  "https://cdn-icons-png.flaticon.com/512/5968/5968381.png", // Stripe
  "https://cdn-icons-png.flaticon.com/512/174/174855.png", // Instagram
  "https://cdn-icons-png.flaticon.com/512/888/888853.png", // Dropbox
  "https://cdn-icons-png.flaticon.com/512/906/906324.png", // Jira
  "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  "https://cdn-icons-png.flaticon.com/512/5968/5968705.png", // Square
  "https://cdn-icons-png.flaticon.com/512/732/732218.png", // Shopify
  "https://cdn-icons-png.flaticon.com/512/5968/5968755.png", // Zapier
  "https://cdn-icons-png.flaticon.com/512/5968/5968520.png", // Google Drive
  "https://cdn-icons-png.flaticon.com/512/1384/1384060.png", // YouTube
  "https://cdn-icons-png.flaticon.com/512/5968/5968885.png", // Airtable
  "https://cdn-icons-png.flaticon.com/512/2111/2111370.png", // Discord
];

export default function IntegrationsSection() {
  return (
    <section className="max-w-7xl mx-auto my-20 px-6 relative group overflow-hidden rounded-[3rem] border border-white/10 p-10 md:p-16">
      <GlassEffect as="div" className="absolute inset-0 z-0">{null}</GlassEffect>
      
      <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side */}
        <div className="uppercase">
          <p className="text-sm font-black tracking-[0.3em] text-[var(--accent-blue)]">
            STACK & TOOLS
          </p>
          <h2 className="display-font gradient-heading text-5xl md:text-7xl font-black mt-4 mb-6 leading-[0.9]">
            SUPERCHARGE <br /> YOUR WORKFLOW
          </h2>
          <p className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed mb-8 max-w-md">
            I LEVERAGE A MODERN ECOSYSTEM OF TOOLS AND PLATFORMS TO BUILD SLEEK, RESPONSIVE INTERFACES AND DATA-DRIVEN STRATEGIES IN RECORD TIME.
          </p>
          <div className="flex flex-wrap gap-4">
            <MagneticButton className="btn-primary rounded-full px-8 py-4">
              <Globe className="h-4 w-4" />
              <TextReveal text="VIEW STACK" as="span" hoverColor="white" />
            </MagneticButton>
            <MagneticButton className="btn-ghost rounded-full px-8 py-4 border-white/10 bg-white/5">
              <TextReveal text="DOCUMENTATION" as="span" hoverColor="white" />
              <ArrowRight className="h-4 w-4 ml-1 opacity-50" />
            </MagneticButton>
          </div>
        </div>

        {/* Right Side */}
        <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {integrations.map((url, idx) => (
            <div
              key={idx}
              className="relative w-full aspect-square p-3 bg-white/5 backdrop-blur-md border border-white/10 shadow-lg hover:scale-110 transition-transform duration-500"
              style={{
                clipPath:
                  "polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)",
              }}
            >
              <img
                src={url}
                alt={`integration-${idx}`}
                className="w-full h-full object-contain p-1.5 opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
