
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X, User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, isCartOpen, setIsCartOpen } = useCart();
  const { user, logout } = useAuth();
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const cartItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleAuthDialogClose = () => {
    setShowAuthDialog(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-indigo-600">Cosmética</h1>
            </Link>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            <Link
              to="/"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600"
            >
              Products
            </Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User size={16} />
                    {user.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  {user.isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/admin" className="w-full">Admin Dashboard</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/admin/products" className="w-full">Manage Products</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="gap-2">
                    <LogOut size={16} />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <AlertDialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User size={16} />
                    Account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="sm:max-w-md">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      {authMode === "login" ? "Login to your account" : "Create an account"}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      {authMode === "login" 
                        ? "Enter your credentials to access your account" 
                        : "Enter your details to create a new account"}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  
                  {authMode === "login" ? (
                    <LoginForm 
                      onSuccess={handleAuthDialogClose}
                      onSwitchToRegister={() => setAuthMode("register")}
                    />
                  ) : (
                    <RegisterForm 
                      onSuccess={handleAuthDialogClose}
                      onSwitchToLogin={() => setAuthMode("login")}
                    />
                  )}
                </AlertDialogContent>
              </AlertDialog>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              className="relative p-2"
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 h-5 w-5 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Button>
          </div>

          <div className="flex items-center sm:hidden">
            <Button
              variant="ghost"
              size="sm"
              className="relative p-2 mr-2"
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 h-5 w-5 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Button>
            <Button
              variant="ghost"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            {user ? (
              <>
                <div className="px-3 py-2 text-base font-medium text-gray-700">
                  {user.name}
                </div>
                {user.isAdmin && (
                  <>
                    <Link
                      to="/admin"
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600"
                      onClick={() => setIsOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                    <Link
                      to="/admin/products"
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600"
                      onClick={() => setIsOpen(false)}
                    >
                      Manage Products
                    </Link>
                  </>
                )}
                <Button
                  variant="ghost"
                  className="w-full justify-start px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600"
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                className="w-full justify-start px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600"
                onClick={() => {
                  setShowAuthDialog(true);
                  setIsOpen(false);
                }}
              >
                Login / Register
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
