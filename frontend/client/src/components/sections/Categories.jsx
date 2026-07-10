import { motion } from "motion/react";
import { categories } from "../../constants/categories";
import SectionHeading from "../ui/SectionHeading";

const Categories = () => {
  return (
    <section className="relative py-28">

      <div className="mx-auto max-w-7xl px-6">

        <SectionHeading
          badge="CATEGORIES"
          title="Explore Every Universe"
          subtitle="Discover content across every category with one click."
        />

        <div className="flex flex-wrap justify-center gap-5">

          {categories.map((category, index) => {

            const Icon = category.icon;

            return (
              <motion.button
                key={category.title}
                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.06,
                }}
                whileHover={{
                  scale: 1.08,
                  y: -6,
                }}
                className="
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  px-6
                  py-4
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:border-indigo-500/30
                  hover:bg-indigo-500/10
                "
              >
                <Icon
                  size={22}
                  className="text-indigo-400"
                />

                <span className="font-medium text-white">
                  {category.title}
                </span>
              </motion.button>
            );
          })}

        </div>

      </div>

    </section>
  );
};

export default Categories;