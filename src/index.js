import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from "./store";
import App from './App';
import { ConfigProvider } from 'antd';
import locale from 'antd/lib/locale/zh_CN';
import 'antd/dist/antd.less';
import 'dayjs/locale/zh-cn';
import dayjs from 'dayjs';
import './style/default.less';
dayjs.locale('zh-cn');


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ConfigProvider locale={locale}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// import reportWebVitals from './reportWebVitals';
// reportWebVitals();
