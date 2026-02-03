export function GeometricLogo() {
  return (
    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 p-2 sm:p-2.5 md:p-3 border-2 border-purple-500/30 rounded-xl sm:rounded-2xl">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="50" cy="50" r="45" stroke="#a855f7" strokeWidth="2" />

        <path
          d="M50,10 L61,40 L95,40 L68,58 L79,90 L50,72 L21,90 L32,58 L5,40 L39,40 Z"
          stroke="#a855f7"
          strokeWidth="1.5"
          fill="none"
        />

        <ellipse cx="50" cy="50" rx="15" ry="10" stroke="#a855f7" strokeWidth="1.5" fill="none" />
        <circle cx="50" cy="50" r="5" fill="#a855f7" />
      </svg>
    </div>
  )
}
