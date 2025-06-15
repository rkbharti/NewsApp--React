import { Link, useLocation } from "react-router-dom";
import logo from '../assets/logo.svg';

const NavBar = () => {
  const location = useLocation();
  const categories = [
    { path: "/", name: "Home" },
    { path: "/business", name: "Business" },
    { path: "/entertainment", name: "Entertainment" },
    { path: "/general", name: "General" },
    { path: "/health", name: "Health" },
    { path: "/science", name: "Science" },
    { path: "/sports", name: "Sports" },
    { path: "/technology", name: "Technology" }
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        {/* Brand with logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img 
            src={logo} 
            alt="TaazaKhabar Logo" 
            width="30" 
            height="30"
            className="me-2"
            loading="lazy"
          />
          TaazaKhabar
        </Link>

        {/* Mobile toggle button */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible menu */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {categories.map((category) => (
              <li className="nav-item" key={category.path}>
                <Link 
                  className={`nav-link ${
                    location.pathname === category.path ? 'active fw-bold' : ''
                  }`}
                  to={category.path}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;