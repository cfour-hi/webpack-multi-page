// 项目公共逻辑和方法

$(() => {
  $('nav').addClass('active');
});

export const consoleLog = (log) => {
  console.log(log);
};

consoleLog('webpack-multi-page');

export default () => {
  consoleLog('Hello Webpack');
};
