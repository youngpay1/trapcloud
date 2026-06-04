import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">404</p>
        <Link to="/" className="nav-link text-xs uppercase tracking-widest">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
