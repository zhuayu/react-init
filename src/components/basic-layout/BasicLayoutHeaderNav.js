import PropTypes from 'prop-types';

BasicLayoutHeaderNav.propTypes = {
  navs: PropTypes.array.isRequired,
  click: PropTypes.func.isRequired,
};

function BasicLayoutHeaderNav(props) {

  return (
    <nav className="nav-container">
      {props.navs.map(item => {
        const isActive = (item === props.active ) ? 'active' : '';
        return <span 
          key={item}
          onClick={(e) => props.click(item, e)}
          className={`nav-item ${item} ${isActive}`}>
        </span>
      })}
    </nav>
  );
}

export default BasicLayoutHeaderNav;