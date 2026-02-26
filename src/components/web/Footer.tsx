import { Globe, Users, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-astral-deep pt-24 pb-14 border-t border-white/5">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-16">

          {/* Logo */}
          <div className="text-xl font-thin tracking-tight text-white">
            Aestheti<span className="font-black italic text-primary">fy.</span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-10">
            <a className="text-xs uppercase tracking-widest text-slate-500 hover:text-white transition-colors" href="#">
              Terms of Service
            </a>
            <a className="text-xs uppercase tracking-widest text-slate-500 hover:text-white transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="text-xs uppercase tracking-widest text-slate-500 hover:text-white transition-colors" href="#">
              Documentation
            </a>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            <SocialIcon icon={<Globe size={16} />} />
            <SocialIcon icon={<Users size={16} />} />
            <SocialIcon icon={<Mail size={16} />} />
          </div>

        </div>

        <div className="text-center">
          <p className="text-xs tracking-widest text-slate-600 uppercase">
            © {new Date().getFullYear()} Aesthetify AI. Building the future of creation.
          </p>
        </div>

      </div>
    </footer>
  )
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <a
      href="#"
      className="w-10 h-10 flex items-center justify-center rounded-full
                 bg-white/5 text-slate-400
                 hover:text-white hover:bg-white/10
                 transition-all"
    >
      {icon}
    </a>
  )
}
