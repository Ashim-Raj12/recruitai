import { Outlet, Link } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between px-4 mx-auto">
          <div className="flex gap-6 md:gap-10">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-bold inline-block">RecruitAI</span>
            </Link>
            <nav className="hidden md:flex gap-6 text-sm font-medium">
              <Link to="/about" className="transition-colors hover:text-foreground/80 text-foreground/60">About</Link>
              <Link to="/pricing" className="transition-colors hover:text-foreground/80 text-foreground/60">Pricing</Link>
              <Link to="/contact" className="transition-colors hover:text-foreground/80 text-foreground/60">Contact</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium hover:underline underline-offset-4">Login</Link>
            <Link to="/register" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row px-4 mx-auto">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by RecruitAI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
