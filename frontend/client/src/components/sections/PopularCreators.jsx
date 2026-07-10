import { motion } from "motion/react";
import { Users } from "lucide-react";

import SectionHeading from "../ui/SectionHeading";
import { creators } from "../../constants/creators";

const PopularCreators = () => {
  return (
    <section className="py-32">

      <div className="mx-auto max-w-7xl px-6">

        <SectionHeading
          badge="CREATORS"
          title="Meet Top Creators"
          subtitle="Follow inspiring creators and discover amazing content every day."
        />

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {creators.map((creator, index) => (
            <motion.div
              key={creator.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              className="
                rounded-3xl
                border
                border-white/10
                bg-white/5
                p-8
                text-center
                backdrop-blur-xl
                transition
              "
            >
              <img
                src={creator.avatar}
                alt={creator.name}
                className="mx-auto h-28 w-28 rounded-full border-4 border-indigo-500 object-cover"
              />

              <h3 className="mt-6 text-2xl font-bold text-white">
                {creator.name}
              </h3>

              <p className="mt-2 text-zinc-400">
                {creator.username}
              </p>

              <div className="mt-5 flex items-center justify-center gap-2 text-indigo-400">
                <Users size={18} />
                {creator.subscribers}
              </div>

              <button
                className="
                  mt-8
                  w-full
                  rounded-xl
                  bg-gradient-to-r
                  from-indigo-600
                  to-purple-600
                  py-3
                  font-semibold
                  transition
                  hover:scale-[1.03]
                "
              >
                Follow
              </button>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default PopularCreators;