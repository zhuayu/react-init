import PropTypes from 'prop-types';

BasicLayoutHeaderNav.propTypes = {
  navs: PropTypes.array.isRequired,
  click: PropTypes.func.isRequired,
  active: PropTypes.string,
};

function BasicLayoutHeaderNav(props) {

  return (
    <nav className="nav-container" data-testid="nav-container">
      {props.navs.map(item => {
        const isActive = (item === props.active ) ? 'active' : '';
        return <span 
          key={item}
          onClick={() => props.click(item)}
          className={`nav-item ${item} ${isActive}`}
          data-testid="nav-item">
        </span>
      })}
    </nav>
  );
}

export default BasicLayoutHeaderNav;