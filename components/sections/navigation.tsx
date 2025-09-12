import Image from "next/image"

export default function Navigation() {
  return (
    <nav className="relative z-10 p-6 flex justify-between items-center max-w-7xl mx-auto">
      <div className="flex items-center">
        <Image
          src="/images/Logo-cis.webp"
          alt="Hack CIS"
          width={180}
          height={60}
          priority
          className="h-12 w-auto"
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