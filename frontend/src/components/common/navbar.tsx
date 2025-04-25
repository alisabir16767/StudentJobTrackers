import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
   Sheet,
   SheetContent,
   SheetTrigger,
 } from '@/components/ui/sheet'; 
import { Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="font-medium">
            Home
          </Link>
          <Link to="/jobs" className="font-medium">
            Jobs
          </Link>
          <Link to="/stats" className="font-medium">
            Statistics
          </Link>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex flex-1 justify-end">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col space-y-4 mt-6">
                <Link to="/" className="font-medium">
                  Home
                </Link>
                <Link to="/jobs" className="font-medium">
                  Jobs
                </Link>
                <Link to="/stats" className="font-medium">
                  Statistics
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Auth Buttons (optional) */}
        <div className="hidden md:flex ml-auto space-x-2">
          <Button variant="outline" size="sm">
            Login
          </Button>
          <Button size="sm">Sign Up</Button>
        </div>
      </div>
    </header>
  );
}