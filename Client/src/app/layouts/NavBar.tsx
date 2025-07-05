import { useRef, useState } from "react";
import { FaUserCircle, FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import logo from "../../assets/logoWithName.png";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type NavbarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

interface UseAuthStore {
  logout: () => Promise<boolean>;
}

type User = {
  admissionYear: number;
  branch: string;
  currentYear: number;
  email: string;
  enrollment: string;
  id: string;
  name: string;
  profile: string;
};

const Navbar = ({ isOpen, toggleSidebar }: NavbarProps) => {
  const logout = useAuthStore((state) => state as UseAuthStore).logout;
  const user = useAuthStore((state) => (state as { user: User }).user);
  const [showDialog, setShowDialog] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      window.location.href = "/login";
      toast.success("Logout successful.");
    }
  };
  

  return (
    <header className="bg-white shadow-md px-4 py-3 flex items-center justify-between w-full fixed top-0 z-50 md:static">
      {/* Left: Logo and Menu Button */}
      <div className="flex items-center gap-3">
        <button className="md:hidden" onClick={toggleSidebar}>
          {isOpen ? (
            <FaTimes className="text-xl" />
          ) : (
            <FaBars className="text-xl" />
          )}
        </button>
        <img src={logo} alt="Logo" className="h-9 md:h-10 w-auto" />
      </div>

      {/* Right: Profile Info & Logout */}
      <div className="flex items-center gap-2 sm:gap-3">
        {user.profile ? (
          <img
            src={user.profile}
            crossOrigin="anonymous"
            onError={(e) => (e.currentTarget.src = "/default-profile.png")}
            alt={user.name || "User"}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <FaUserCircle className="text-2xl text-purple-700" />
        )}

        {/* Hide name text on small screens */}
        <span className="text-sm font-semibold hidden sm:block truncate max-w-[100px]">
          {user.name}
        </span>

        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button
              size="sm"
              className="bg-red-600 hover:bg-red-700 text-white rounded-2xl px-3 py-1 text-xs sm:text-sm"
              onClick={() => setShowDialog(true)}
            >
              <span className="hidden sm:inline">Logout

              </span>
              <span className="sm:hidden"><FaSignOutAlt /></span>
            </Button>
          </DialogTrigger>

          <DialogContent
            ref={dialogRef}
            className="sm:max-w-md border border-gray-100 bg-white shadow-2xl rounded-2xl"
          >
            <DialogHeader>
              <DialogTitle>Are you sure you want to logout?</DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="secondary"
                className="bg-gray-600 hover:bg-gray-700 text-white rounded-2xl"
                onClick={() => setShowDialog(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white rounded-2xl"
                onClick={handleLogout}
              >
                Confirm Logout
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
};

export default Navbar;
