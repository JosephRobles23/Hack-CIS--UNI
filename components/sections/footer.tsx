import { Twitter, Github, Mail } from "lucide-react"
import GradientText from "@/components/gradient-text"

export default function Footer() {
  return (
    <footer className="w-full py-4 text-xs text-gray-400 text-center border-t border-white/10">
      <div className="">
        <div className="flex items-center justify-center gap-2">
          <span>Open source</span>
          <span>•</span>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-gray-300 transition-colors text-yellow-400"
          >
            <Github className="w-3 h-3" />
            <span>Contribute</span>
          </a>
        </div>
      </div>

      <p>
        made by{" "}
        <a
          href="https://www.linkedin.com/in/joseph-chuquipiondo-robles-230733256/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-300 transition-colors underline cursor-pointer"
        >
          Joseph
        </a>
        ,{" "}
        <a
          href="https://www.linkedin.com/in/eduardo-enrique-villegas-bojorquez/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-300 transition-colors underline cursor-pointer"
        >
          Eduardo
        </a>
        {/* {" • "}
        inspiration from{" "}
        <a
          href="https://www.colombiatechfest.ai-hackathon.co/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-300 transition-colors underline cursor-pointer"
        >
          ai-hackathon.com
        </a> */}
      </p>
    </footer>
  );
}