import { WordCloud } from '@antv/g2plot';
import * as React from 'react'
const Js2WordCloud = require('js2wordcloud')



export default class WCloud extends React.Component<any> {
  componentDidMount = () => {
    var canvas = document.getElementById("container");
    //生成
    var wc = new Js2WordCloud(canvas);
    console.log(wc);

    wc.setOption({
      tooltip: {
        show: true
      },
      list: [
        ['Performance', 6],
        ['Monitor', 6],
        ['Electron', 4],
        ['TypeScript', 4],
        ['Error', 4],
        ['React', 8],
        ['Webpack', 2],
        ['JavaScript', 2],
        ['Css', 4],
        ['Less', 6],
        ['Resource', 8],
        ['Timing', 6],
        ['geolocation', 2],
        ['Performance', 6],
        ['Monitor', 6],
        ['Electron', 4],
        ['TypeScript', 4],
        ['Error', 4],
        ['React', 8],
        ['Webpack', 2],
        ['JavaScript', 2],
        ['Css', 4],
        ['Less', 6],
        ['Resource', 8],
        ['Timing', 6],
        ['geolocation', 2],
        ['Performance', 6],
        ['Monitor', 6],
        ['Electron', 4],
        ['TypeScript', 4],
        ['Error', 4],
        ['React', 8],
        ['Webpack', 2],
        ['JavaScript', 2],
        ['Css', 4],
        ['Less', 6],
        ['Resource', 8],
        ['Timing', 6],
        ['geolocation', 2],
        ['Performance', 6],
        ['Monitor', 6],
        ['Electron', 4],
        ['TypeScript', 4],
        ['Error', 4],
        ['React', 8],
        ['Webpack', 2],
        ['JavaScript', 2],
        ['Css', 4],
        ['Less', 6],
        ['Resource', 8],
        ['Timing', 6],
        ['geolocation', 2],
        ['Performance', 6],
        ['Monitor', 6],
        ['Electron', 4],
        ['TypeScript', 4],
        ['Error', 4],
        ['React', 8],
        ['Webpack', 2],
        ['JavaScript', 2],
        ['Css', 4],
        ['Less', 6],
        ['Resource', 8],
        ['Timing', 6],
        ['geolocation', 2],
        ['Performance', 6],
        ['Monitor', 6],
        ['Electron', 4],
        ['TypeScript', 4],
        ['Error', 4],
        ['React', 8],
        ['Webpack', 2],
        ['JavaScript', 2],
        ['Css', 4],
        ['Less', 6],
        ['Resource', 8],
        ['Timing', 6],
        ['geolocation', 2],
        ['Performance', 6],
        ['Monitor', 6],
        ['Electron', 4],
        ['TypeScript', 4],
        ['Error', 4],
        ['React', 8],
        ['Webpack', 2],
        ['JavaScript', 2],
        ['Css', 4],
        ['Less', 6],
        ['Resource', 8],
        ['Timing', 6],
        ['geolocation', 2],
        ['Performance', 6],
        ['Monitor', 6],
        ['Electron', 4],
        ['TypeScript', 4],
        ['Error', 4],
        ['React', 8],
        ['Webpack', 2],
        ['JavaScript', 2],
        ['Css', 4],
        ['Less', 6],
        ['Resource', 8],
        ['Timing', 6],
        ['geolocation', 2],
      ],
      color: 'blue',
      // ellipticity: 0.6,
      // shape: "ellipse",
      imageShape: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*07tdTIOmvlYAAAAAAAAAAABkARQnAQ',
      // imageShape: '//cdn.weimob.com/saas/zhan/images/4.21/tuoyuna.png',
      fontSizeFactor: 0.1,  // 当词云值相差太大，可设置此值进字体行大小微调，默认0.1
      maxFontSize: 8, // 最大fontSize，用来控制weightFactor，默认60
      minFontSize: 1,
      // rotateRatio: 0,
      // gridSize: 4,
    })
  }
  render = () => {
    return (
      <div id="container" style={{ width: '80%', height: 300, margin: 20 }}></div>
    )
  }
}
