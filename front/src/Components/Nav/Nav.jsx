import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import './Nav.scss';

function Nav() {
  return (

  <div className='test'>
      <div className='ui two item menu'>

        <Menu.Item
          as={NavLink}
          to="/signup"
          end
        >
          Page 1
        </Menu.Item>

        <Menu.Item
          as={NavLink}
          to="/signup/2"
          end
        >
          Page 2
        </Menu.Item>
      </div>

  </div>
    

  );
}

export default React.memo(Nav);