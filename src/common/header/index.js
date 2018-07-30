import React from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { Link } from 'react-router-dom';

import {
  HeaderWrapper
} from './style';

const Header = (props) => {
  return (
    <HeaderWrapper>
      <span>Header</span>
      <span onClick={props.handleToggleLogin}>{props.isLogin ? 'isLogin' : 'unLogin'}</span>
      <span onClick={ ()=> props.handleTestAxios(props.list)}>axios</span>
      <span>{JSON.stringify(props.list)}</span>
      <Link to={'/detail/1'}>Detail</Link>
      <Link to={'/'}>Home</Link>
    </HeaderWrapper>
  );
}

const mapStateToProps = (state) => {
  return {
    isLogin:state.getIn(['header','isLogin']),
    list:state.getIn(['header','list'])
  }
}

const mapDispathToProps = (dispatch) => {
  return {
    handleToggleLogin(){
      dispatch(actionCreators.handleToggleLogin());
    },
    handleTestAxios(list){
      list.size === 0 && dispatch(actionCreators.handleTestAxios());
    }
  }
}

export default connect(mapStateToProps, mapDispathToProps)(Header);
