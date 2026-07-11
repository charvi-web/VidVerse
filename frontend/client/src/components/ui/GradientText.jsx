const GradientText = ({ children, from = "from-indigo-400", via = "via-purple-400", to = "to-fuchsia-400", className = "" }) => (
  <span className={`bg-gradient-to-r ${from} ${via} ${to} bg-clip-text text-transparent ${className}`}>
    {children}
  </span>
);

export default GradientText;
