import * as React from 'react'
import { Link } from 'react-router-dom';
import './index.less'
interface HeaderItem {
  name: string,
  path: string
}

const headerList = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Docs',
    path: '/docs'
  },
  {
    name: 'Experience',
    path: '/exp'
  },
  {
    name: 'Join',
    path: '/join'
  }
]
export default class header extends React.Component {
  render = () => {
    return (
      <header className="header" >
        {
          headerList.map((item: HeaderItem, idx: number) => {
            return (
              <Link className="nav" style={{ color: '#808695', textDecoration: 'none' }} to={item.path} key={idx} replace> {item.name}</Link>
            )
          })
        }
      </header >
    )
  }
}