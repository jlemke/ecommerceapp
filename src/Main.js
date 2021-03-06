import React, { useState, useEffect } from 'react';
import { Container } from './Container';
import { API } from 'aws-amplify';
import { List } from 'antd';
import { checkUser } from './checkUser';

export const Main = () => {

  const [state, setState] = useState({
    products: [], 
    loading: true
  });

  const [user, updateUser] = useState({});

  let didCancel = false;
  
  useEffect(
    () => {
      getProducts();
      checkUser(updateUser);
      
      //return () => didCancel = true;
    }, []
  );

  const getProducts = async () => {
    const data = await API.get('ecommerceapi', '/products');
    console.log('data: ', data);

    console.log("didCancel: " + didCancel);

    if (didCancel) return;
    // update products
    setState({
      products: data.data.Items, 
      loading: false
    });
  };

  const deleteItem = async (id) => {
    try {
      // optimistically remove product with that id
      const products = state.products.filter(p => p.id !== id);
      setState({ 
        ...state, 
        products: products
      });

      // send a delete to the api
      await API.del(
        'ecommerceapi', 
        '/products', 
        { 
          body: { 
            id 
          } 
        }
      );

      console.log('successfully deleted item');
    } 
    catch (err) {
      console.log('error: ', err);
    }
  }

  
  return (
    <Container>
      <List
        itemLayout="horizontal"
        dataSource={state.products}
        loading={state.loading}
        renderItem={item => (
          <List.Item
            actions={user.isAuthorized ?
              [<a onClick={() => deleteItem(item.id)}
              key={item.id}>delete</a>] : null}
          >
            <List.Item.Meta
              title={item.name}
              description={item.price}
            />
          </List.Item>
        )}
      />
    </Container>
  )
};