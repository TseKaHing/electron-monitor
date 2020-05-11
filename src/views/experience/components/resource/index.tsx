import * as React from 'react'
import axios from 'axios'
axios.defaults.timeout = 1000 * 15;
axios.defaults.headers['Content-Type'] = 'application/json'
import { Input, Table, Button, Divider } from 'antd'
const { Search } = Input
import './index'

const columns = [
  {
    title: 'Name',
    dataIndex: '_name',
  },
  {
    title: 'Type',
    dataIndex: 'type',
  },
  {
    title: 'Duration',
    dataIndex: '_duration',
  },
  {
    title: 'Size',
    dataIndex: "_size"
  },
  {
    title: 'Protocol',
    dataIndex: "_protocol"
  }
];
export default class Resource extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      resource: [],
      filter_resource: []
    }
  }
  filter = (type: string) => {
    let { resource } = this.state
    if (type !== "all") {
      var filter = resource.filter((item: any) => {
        if (item.type == type) {
          return item
        }
      })
      this.setState({
        filter_resource: filter
      })
    } else {
      this.setState({
        filter_resource: resource
      })
    }
  }
  componentDidMount() {
    axios.get('http://localhost:3000/parse/getsite')
      .then(res => {
        if (res.data.code == 200) {
          let { _resources } = res.data.Performance
          if (_resources) {
            console.log(_resources);
            let _res = []
            for (let key in _resources) {
              if (_resources[key].length !== 0) {
                for (let i = 0; i < _resources[key].length; i++) {
                  _res.push({
                    type: key,
                    ..._resources[key][i],
                    key: i
                  })
                }
              }
            }
            this.setState({
              resource: _res,
              filter_resource: _res
            })
          }
        }
      })
      .catch(err => console.log(err))
  }
  search = (key: string) => {
    let { filter_resource, resource } = this.state
    let search: any = []
    if (!key || key.length == 0) {
      this.setState({
        filter_resource: resource
      })
    } else {
      for (let i = 0; i < filter_resource.length; i++) {
        console.log(filter_resource[i]);
        if (filter_resource[i]._name.indexOf(key) > -1) {
          search.push(filter_resource[i])
        }
      }
      this.setState({
        filter_resource: search
      })
    }

  }
  render() {
    let { filter_resource } = this.state
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Divider orientation="left">Resource Detail</Divider>
        <Search
          placeholder="Search here..."
          onSearch={this.search.bind(this)}
          style={{ width: "96%" }}
        />
        <div className="btn-group" style={{ width: '96%', marginTop: 10 }}>
          <Button style={{ marginRight: '5px' }} className="btn" onClick={this.filter.bind(this, "all")}>all</Button>
          <Button style={{ marginRight: '5px' }} className="btn" onClick={this.filter.bind(this, "xmlhttprequest")}>xmlhttprequest</Button>
          <Button style={{ marginRight: '5px' }} className="btn" onClick={this.filter.bind(this, "css")}>css</Button>
          <Button style={{ marginRight: '5px' }} className="btn" onClick={this.filter.bind(this, "script")}>script</Button>
          <Button style={{ marginRight: '5px' }} className="btn" onClick={this.filter.bind(this, "img")}>img</Button>
          <Button style={{ marginRight: '5px' }} className="btn" onClick={this.filter.bind(this, "link")}>link</Button>
          <Button style={{ marginRight: '5px' }} className="btn" onClick={this.filter.bind(this, "fetch")}>fetch</Button>
          <Button style={{ marginRight: '5px' }} className="btn" onClick={this.filter.bind(this, "other")}>other</Button>
        </div>
        <Table style={{ width: '96%' }} columns={columns} dataSource={filter_resource} size="small" />
      </div>
    )
  }
}