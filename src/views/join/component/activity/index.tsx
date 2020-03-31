import * as React from 'react'
import { Collapse, Tag } from 'antd';
const { Panel } = Collapse;

export default class Activity extends React.Component<any, any>{
  render = () => {
    return (
      <Collapse style={{ width: '100%', height: '100%', position: 'relative', top: '1.25rem' }} accordion>
        <Panel header="风变科技（深圳）有限公司 - 前端实习生" key="1">
          <ul>
            <li><p>参与IDP（移动端）项目，负责“我的学分”功能模块的开发，等还原配合产品与交互设计师网页，包括学分排行榜，学分记录等页面，期间封装了可配置的列表组件，并实现防抖函数优化了列表的加载</p></li>
            <li><p>维护IDP预览工具（PC端）项目，主要处理内容研发反馈的hotfix issue，并实现了在网页跳转到VSCode对应行列的新功能</p></li>
            <li><p>工作期间涉及到的技术：
              <Tag color="geekblue">React</Tag>
              <Tag color="purple">Typescript</Tag>
              <Tag color="magenta">Websocket</Tag>
              <Tag color="gold">Git</Tag>
            </p></li>
          </ul>
        </Panel>
        <Panel header="珠海夸克信息技术有限公司（校内工作室）- 前端负责人" key="2">
          <ul>
            <li><p>重构原有的前端后台管理系统</p></li>
            <li><p>负责前端技术选型，承担WEB前端核心模块的设计、实现工作</p></li>
            <li><p>带领4人的前端小组开发该系统，整理项目需求，并根据项目需求制定对应的开发计划</p></li>
          </ul>
        </Panel>
        <Panel header="iceHorizonCloud（校内工作室）- 前端负责人" key="3">
          <ul>
            <li><p>带领3人前端团队开发后台管理系统，并负责前端技术栈选型以及项目基础架构的搭建</p></li>
          </ul>
        </Panel>
        <Panel header="腾讯 - QQ飞车赛事团外团负责人" key="4">
          <ul>
            <li><p>带领3人前端团队开发后台管理系统，并负责前端技术栈选型以及项目基础架构的搭建</p></li>
          </ul>
        </Panel>
        <Panel header="腾讯 - QQ飞车微信团外团写手及官微运营者" key="5">
          <ul>
            <li><p>负责QQ飞车官方微信公众号的运营以及技术帖的撰写和排版工作，撰写100余篇推文，阅读量均1w+，高于同时期写手</p></li>
          </ul>
        </Panel>
      </Collapse>
    )
  }
}