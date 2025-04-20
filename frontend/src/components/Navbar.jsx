import { Link, useResolvedPath } from "react-router-dom";
import { ShoppingCartIcon, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import ThemeSelector from "./ThemeSelector";
import { useProductStore } from "../store/useProductStore";
import { useCartStore } from "../store/useCartStore";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { pathname } = useResolvedPath();
  const isHomePage = pathname === "/";

  const { products } = useProductStore();
  const { getTotalItems } = useCartStore();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <div className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-base-100/95 backdrop-blur-lg shadow-lg' : 'bg-base-100/80 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="navbar px-2 py-2 min-h-[3rem] justify-between">
          {/* LOGO */}
          <div className="flex-1 lg:flex-none">
            <Link to="/" className="group hover:opacity-90 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <ShoppingCartIcon className="size-10 text-primary transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
                  <span className="absolute -top-1 -right-1 bg-secondary text-secondary-content text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {getTotalItems()}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold font-mono tracking-widest text-2xl lg:text-3xl 
                    bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary
                    transition-all duration-300 group-hover:tracking-[0.2em]">
                    QUICK PICK
                  </span>
                  <span className="text-xs font-light opacity-70 -mt-1">Smart Shopping</span>
                </div>
              </div>
            </Link>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className={`text-lg font-medium hover:text-primary transition-colors duration-300 ${pathname === '/' ? 'text-primary' : ''}`}>
              Home
            </Link>
            <Link to="/cart" className={`text-lg font-medium hover:text-primary transition-colors duration-300 ${pathname === '/cart' ? 'text-primary' : ''}`}>
              Cart
            </Link>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-2">
            <ThemeSelector />

            <Link to="/cart" className="btn btn-circle btn-primary btn-sm hover:scale-105 transition-transform duration-200 relative">
              <ShoppingCartIcon className="size-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-secondary-content text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {/* MOBILE MENU TOGGLE */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn btn-ghost btn-circle btn-xs md:hidden"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div className={`md:hidden px-4 pb-4 space-y-3 ${mobileMenuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'} transition-all duration-300 overflow-hidden`}>
          <Link 
            to="/" 
            className={`block py-2 text-xl font-medium ${pathname === '/' ? 'text-primary' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/cart" 
            className={`block py-2 text-xl font-medium ${pathname === '/cart' ? 'text-primary' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Cart
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
