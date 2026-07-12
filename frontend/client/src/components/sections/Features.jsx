import { motion } from "motion/react";
import { useTheme } from "../../context/ThemeContext";

import { features } from "../../constants/features";
import SectionHeading from "../ui/SectionHeading";
import GlassCard from "../ui/GlassCard";

const Features = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      className="relative py-32 transition-colors duration-500"
      style={{
        background: isDark ? "#09090B" : "#f8fafc",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          badge="FEATURES"
          title="Built for the Next Generation of Creators"
          subtitle="VIDVERSE combines speed, AI and premium streaming technology into one powerful platform."
        />

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard>
                  <div
                    className="mb-6 inline-flex rounded-2xl p-4"
                    style={{
                      background: isDark
                        ? "rgba(99,102,241,.12)"
                        : "rgba(99,102,241,.08)",
                    }}
                  >
                    <Icon
                      size={32}
                      style={{
                        color: "#6366f1",
                      }}
                    />
                  </div>

                  <h3
                    className="mb-4 text-2xl font-bold"
                    style={{
                      color: isDark ? "#ffffff" : "#111827",
                    }}
                  >
                    {feature.title}
                  </h3>

                  <p
                    className="leading-7"
                    style={{
                      color: isDark ? "#a1a1aa" : "#6b7280",
                    }}
                  >
                    {feature.description}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;