import React, { 
  useState, 
  useEffect,
} from 'react';

import { 
  Link, 
  useLocation
} from 'react-router-dom';
import { Menu } from 'antd';
import { 
  HomeOutlined, 
  UserOutlined, 
  ProfileOutlined 
} from '@ant-design/icons';
import { Hub } from 'aws-amplify';

import { checkUser } from './checkUser';


export const Nav = () => {

  // TODO check that this is working correctly
  // Also changed keys by adding '/' in front of paths
  const location = useLocation();

  const pathkey = location.pathname;
  console.log(pathkey);

  const [user, updateUser] = useState({});

  useEffect(
    () => {
      checkUser(updateUser);

      Hub.listen(
        'auth', 
        (data) => {
          // get event from data.payload
          const { payload: { event } } = data;
          console.log('event: ', event);
          
          if (event === 'signIn' || event === 'signOut') {
            checkUser(updateUser);
          }
        }
      );
    }, []
  );

  return (
    <div>
      <Menu 
        selectedKeys={[pathkey]} 
        mode="horizontal"
      >
        <Menu.Item 
          key='/'
        >
          <Link 
            to={`/`}
          >
            <HomeOutlined />
            Home
          </Link>
        </Menu.Item>
        <Menu.Item 
          key='/profile'
        >
          <Link 
            to='/profile'
          >
            <UserOutlined />
            Profile
          </Link>
        </Menu.Item>
        {
          user.isAuthorized && (
            <Menu.Item 
              key='/admin'
            >
              <Link 
                to='/admin'
              >
                <ProfileOutlined />
                Admin
              </Link>
            </Menu.Item>
          )
        }
      </Menu>
    </div>
  );
};