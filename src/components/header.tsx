import { Link } from "react-router-dom";
import {
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { useState } from "react";
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import logo from "../assets/images/kapisah.jpg";
import md5 from "md5";

interface PropsType {
  user: User | null;
}

const Header = ({ user }: PropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Sign Out Successfully");
      setIsOpen(false);
    } catch (error) {
      toast.error("Sign Out Fail");
    }
  };

  const getProfileImage = (email: string) => {
    const hash = md5(email.toLowerCase().trim());
    return `https://www.gravatar.com/avatar/${hash}?d=mp`;
  };

  return (
    <header className="header">
      <div className="flex items-center">
        <img src={logo} alt="Kapisah Logo" className="logo" />
        
        <div className="nav-group">
          <Link onClick={() => setIsOpen(false)} to={"/"}>HOME</Link>
          <Link onClick={() => setIsOpen(false)} to={"/search"}><FaSearch /></Link>
          <Link onClick={() => setIsOpen(false)} to={"/cart"}><FaShoppingBag /></Link>
        </div>

        {user?._id ? (
          <>
            <button className="profile-photo" onClick={() => setIsOpen((prev) => !prev)}>
              <img 
                src={getProfileImage(user.email)} 
                alt="Profile" 
                className="profile-photo"
              />
            </button>
            <dialog open={isOpen}>
              <div>
                {user.role === "admin" && (
                  <Link onClick={() => setIsOpen(false)} to="/admin/dashboard">Admin</Link>
                )}
                <Link onClick={() => setIsOpen(false)} to="/orders">Orders</Link>
                <button onClick={logoutHandler}><FaSignOutAlt /></button>
              </div>
            </dialog>
          </>
        ) : (
          <Link to={"/login"} className="profile-photo">
            <FaSignInAlt />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
