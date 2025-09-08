import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { signOutUser } from '@/lib/firebase';
import AuthModal from './AuthModal';

const Header = () => {
  const { user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOutUser();
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getUserInitial = (user: any) => {
    if (user?.displayName) {
      return user.displayName.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm" data-testid="header">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3" data-testid="logo">
            <div className="w-8 h-8 bg-gradient-purple-pink rounded-lg flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-xl font-bold font-headline text-foreground">Visionary AI</span>
          </a>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6" data-testid="navigation">
            <a href="/neuravision" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-neuravision">NeuraVision AI</a>
            <a href="#tools" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-tools">Tools</a>
            <a href="#guides" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-guides">Guides</a>
            <a href="#gallery" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-gallery">Gallery</a>
          </nav>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-card transition-colors"
                  data-testid="user-menu-button"
                >
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt="User avatar" 
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gradient-purple-blue rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-white">{getUserInitial(user)}</span>
                    </div>
                  )}
                  <span className="text-sm font-medium text-foreground hidden sm:block">
                    {user.displayName || user.email?.split('@')[0]}
                  </span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-card rounded-lg shadow-xl border border-border/50 py-2 z-10" data-testid="user-dropdown">
                    <div className="px-4 py-3 border-b border-border/50">
                      <div className="flex items-center space-x-3">
                        {user.photoURL ? (
                          <img 
                            src={user.photoURL} 
                            alt="User avatar" 
                            className="w-10 h-10 rounded-full"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gradient-purple-blue rounded-full flex items-center justify-center">
                            <span className="text-sm font-semibold text-white">{getUserInitial(user)}</span>
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {user.displayName || 'User'}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>
                    <a href="#profile" className="block px-4 py-2 text-sm hover:bg-muted transition-colors" data-testid="link-profile">Profile</a>
                    <a href="#settings" className="block px-4 py-2 text-sm hover:bg-muted transition-colors" data-testid="link-settings">Settings</a>
                    <div className="border-t border-border/50 my-2"></div>
                    <a href="#faq" className="block px-4 py-2 text-sm hover:bg-muted transition-colors" data-testid="link-faq">FAQ</a>
                    <a href="#terms" className="block px-4 py-2 text-sm hover:bg-muted transition-colors" data-testid="link-terms">Terms</a>
                    <a href="#about" className="block px-4 py-2 text-sm hover:bg-muted transition-colors" data-testid="link-about">About Us</a>
                    <a href="#contact" className="block px-4 py-2 text-sm hover:bg-muted transition-colors" data-testid="link-contact">Contact Us</a>
                    <div className="border-t border-border/50 my-2"></div>
                    <a href="https://t.me/visionaryai" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm hover:bg-muted transition-colors" data-testid="link-telegram">Telegram</a>
                    <a href="https://twitter.com/visionaryai" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm hover:bg-muted transition-colors" data-testid="link-twitter">Twitter</a>
                    <a href="https://instagram.com/visionaryai" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm hover:bg-muted transition-colors" data-testid="link-instagram">Instagram</a>
                    <a href="https://discord.gg/visionaryai" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm hover:bg-muted transition-colors" data-testid="link-discord">Discord</a>
                    <div className="border-t border-border/50 my-2"></div>
                    <button 
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-destructive hover:bg-muted transition-colors"
                      data-testid="button-logout"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-gradient-purple-pink hover:opacity-90 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
                data-testid="button-login"
              >
                Login / Sign Up
              </button>
            )}
          </div>
        </div>
      </header>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

export default Header;
