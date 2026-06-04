import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-background">

      {/* Half-circle spinning stars */}
      <div className="flex justify-center overflow-hidden h-20">
        <img
          src="/stars.png"
          alt=""
          className="w-44 h-44 animate-spin-slow mix-blend-screen opacity-90"
        />
      </div>

      {/* Blue bar */}
      <div className="bg-[#080e28] py-1">
        <div className="container max-w-4xl flex justify-center">
          <p className="text-[8px] text-white/30 uppercase tracking-[0.25em]">
            © 2026 Trapcloud &nbsp;·&nbsp;{' '}
            <Link to="/imprint" className="hover:text-white/60 transition-colors">
              Legal Notice
            </Link>
          </p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
