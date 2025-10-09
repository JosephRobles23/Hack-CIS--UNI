import Image from "next/image"

export default function Navigation() {
  return (
    <nav className="relative z-30 px-6 pt-6 flex justify-between items-center max-w-7xl mx-auto pointer-events-none">
      <div className="flex items-center pointer-events-auto">
        <Image
          src="/images/Logo-cis.webp"
          alt="Hack CIS"
          width={150}
          height={50}
          priority
          className="h-11 w-auto"
        />
      </div>
      {/* <div className="hidden md:flex items-center space-x-8">
        <a href="#about" className="text-gray-400 hover:text-white transition-colors">
          About
        </a>
        <a href="#details" className="text-gray-400 hover:text-white transition-colors">
          Details
        </a>
        <a href="#register" className="text-gray-400 hover:text-white transition-colors">
          Register
        </a>
      </div> */}
    </nav>
  )
}