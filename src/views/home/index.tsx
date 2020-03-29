import * as React from 'react'
import './index.less'

interface CardItem {
  title: string,
  text: string
}
const cardList = [
  {
    title: "页面性能监控",
    text: ""
  },
  {
    title: "JS错误监控",
    text: ""
  },
  {
    title: "自动错误报警",
    text: ""
  },
  {
    title: "pv/pu收集",
    text: ""
  },
  {
    title: "IP转换工具",
    text: ""
  },
  {
    title: "多个监测站点",
    text: ""
  }
]
export default class Home extends React.Component<any, any>{
  render = () => {
    return (
      <section className="main">
        <section className="introduction">
          <div className="introduction-title">前端性能监控</div>
          <div className="introduction-motto">
            <span>“If you cannot measure it, you cannot improve it.”</span>
            <span style={{ textAlign: "right", flex: 1 }}>———— William Thomson</span>
          </div>
        </section>
        <section className="function">
          <div className="function-title">核心功能</div>
          <div className="card" >
            {
              cardList.map((cardItem: CardItem, idx: number) => {
                return (
                  <div className="function-card" key={`${idx}`}>
                    <span className="function-card-title">{cardItem.title}</span>
                    <span className="function-card-text">{cardItem.text}</span>
                  </div>
                )
              })
            }
          </div>
        </section>
      </section>
    )
  }
}