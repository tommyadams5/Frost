function Navbar() {
  return (
    <div className="navbar">
      <a className="navbar_link" href="/server/delete-account">
        Delete Account
      </a>
      <a className="navbar_link" href="/server/delete">
        Clear Feed
      </a>
      <a className="navbar_link" href="/server/logout">
        Logout
      </a>
    </div>
  );
}

export default Navbar;
