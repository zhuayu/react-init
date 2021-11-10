const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

// Largest Contentful Paint (LCP): 衡量加载性能。为了提供一个好的用户体验，LCP应该在2.5秒内。
// First Input Delay (FID)       : 衡量可交互性。为了提供一个好的用户体验，FID应该在100毫秒内。
// Cumulative Layout Shift (CLS) : 衡量视觉稳定性。为了提供一个好的用户体验，CLS应该小于0.1。

export default reportWebVitals;
