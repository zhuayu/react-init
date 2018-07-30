import React, { Component } from 'react';
import { withRouter,Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Detail extends Component {
  componentDidMount() {
    console.log(this.props.match.params.id);
  }

  render() {
    const { isLogin } = this.props;
    if(isLogin){
      return (
        <div>Detail</div>
      )
    }else{
      return <Redirect to='/login'></Redirect>
    }
  }
}

const mapState = (state) => ({
  isLogin: state.getIn(['header','isLogin'])
});

const mapDispatch = (dispatch) => ({

});

export default connect(mapState, mapDispatch)(withRouter(Detail));;