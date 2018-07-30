import * as constants from './constants';
import axios from 'axios';
import { fromJS } from 'immutable';


export const handleToggleLogin = () => ({
  type: constants.TOGGLE_LOGIN
});

export const handleTestAxiosData = (data) => ({
  type: constants.TEST_AXIOS,
  data: fromJS(data)
})

export const handleTestAxios = () => {
  return (dispatch) => {
    axios.get('/test/axios').then((res)=>{
      console.log('success')

      let data = [1,2,3];
      dispatch(handleTestAxiosData(data))
    }).catch(()=>{
      console.log('error')

      let data = [1,2,3];
      dispatch(handleTestAxiosData(data))
    })
  }
}