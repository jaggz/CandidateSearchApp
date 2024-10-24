import { NavLink } from "react-router-dom";
const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <div className="nav">
      <div className="nav-item">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active nav-link' : 'nav-link')}>Home</NavLink>
       
      </div>
      <div className="nav-item">
        <NavLink to="/SavedCandidates" className={({ isActive }) => (isActive ? 'active nav-link' : 'nav-link')}>Potential Candidates</NavLink>
       
      </div>
    </div>
  )
};

export default Nav;
