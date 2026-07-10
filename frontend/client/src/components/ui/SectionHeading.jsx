const SectionHeading = ({
  badge,
  title,
  subtitle,
}) => {
  return (
    <div className="mx-auto mb-16 max-w-3xl text-center">

      <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-400">
        {badge}
      </span>

      <h2 className="mt-6 text-5xl font-black tracking-tight text-white">
        {title}
      </h2>

      <p className="mt-5 text-lg leading-8 text-zinc-400">
        {subtitle}
      </p>

    </div>
  );
};

export default SectionHeading;