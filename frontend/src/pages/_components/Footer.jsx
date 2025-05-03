import { Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-blue-500" />
              <span className="font-bold text-white">ScamShield</span>
            </div>
            <p className="text-slate-400 text-sm">
              Protecting users from digital scams across multiple languages
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-slate-400 text-sm">
            © 2024 ScamShield. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 text-slate-400 text-sm">
            Supports English, Spanish, and French
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
