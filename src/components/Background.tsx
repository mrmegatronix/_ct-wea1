export function Background() {
  return (
    <div className="bg-dynamic-weather">
      <div className="aurora-bg"></div>
      <div className="cloud w-96 h-96 top-20 left-10" style={{ animationDuration: '120s' }}></div>
      <div className="cloud w-64 h-64 top-60 right-20" style={{ animationDuration: '80s', animationDelay: '-40s' }}></div>
      <div className="cloud w-80 h-80 top-1/2 left-1/3" style={{ animationDuration: '150s', animationDelay: '-20s', opacity: 0.6 }}></div>
    </div>
  );
}
