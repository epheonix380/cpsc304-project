import './Sidebar.css'


function Sidebar({links, onLinkClick}) {
  return (
    <div className="sidebar">
      <ul>
        {links.map((link) => {
          return (
            <li key={link.id} onClick={(e) => onLinkClick(e, link.id)}>
              {link.title}
            </li>
          )
        })}
        <li><a href='/admin'>Admin</a></li>
      </ul>
    </div>
  );
}

export default Sidebar;