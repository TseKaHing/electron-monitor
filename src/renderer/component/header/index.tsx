import * as React from 'react'
import { Link } from 'react-router-dom';
import './header.less'
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
              <nav className="nav" key={idx}>
                <Link style={{ textDecoration: 'none', color: '#545454' }} to={item.path}>{item.name}</Link>
              </nav>
            )
          })
        }
      </header>
    )
  }
}