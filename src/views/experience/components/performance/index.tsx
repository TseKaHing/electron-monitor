import * as React from 'react'
import axios from 'axios'
axios.defaults.timeout = 1000 * 15;
axios.defaults.headers['Content-Type'] = 'application/json'
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend
} from 'bizcharts';
import { Divider, Table } from 'antd'
import Error from '../error';

const columns = [
  {
    title: 'Location',
    dataIndex: '_location',
  },
  {
    title: 'PV',
    dataIndex: '_pv',
  },
  {
    title: 'UV',
    dataIndex: '_uv',
  }
];
export default class Performance extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      performance: [],
      pv: 0,
      uv: '127.0.0.1',
      location: ''
    }
  }
  componentDidMount() {
    let _key = localStorage.getItem("_key")
    let _token = localStorage.getItem("_token")
    axios.post('http://localhost:3000/parse/getsite', { _key, _token })
      .then(res => {
        if (res.data.code == 200) {
          let { _performance, _pv, _uv, _user_conf } = res.data.Performance
          let { performance } = this.state
          if (_performance) {
            for (let key in _performance) {
              let val = _performance[key]
              performance.push({
                name: key,
                time: val
              })
            }
          }
          axios.get('https://apis.map.qq.com/ws/geocoder/v1/', {
            params: {
              location: _user_conf._location._latitude + ',' + _user_conf._location._longitude,
              key: 'IG6BZ-IJZKP-IIRDQ-VFOWP-FM2Y5-WJBIM'
            }
          }).then(res => {
            this.setState({
              location: res.data.result.address,
              performance,
              pv: _pv,
              uv: _uv
            })
          }).catch(err => {
            throw new Error(err)
          })
        }
      })
      .catch(err => {
        throw new Error(err)
      })
  }
  render() {
    let display = []
    let { performance, uv, pv, location } = this.state
    let _analysis: any = [
      {
        _location: location,
        _uv: uv,
        _pv: pv,
        key: 0
      }
    ]
    // 深拷贝
    for (let i in performance) {
      var name = performance[i].name
      var time = performance[i].time
      display.push({
        name,
        time,
        key: i
      })
    }
    const cols1 = {
      time: {
        tickInterval: 500
      }
    };
    let line = []
    for (let i in performance) {
      const type = 'Performances数据流'
      var name = performance[i].name
      var time = performance[i].time
      line.push({
        type,
        name,
        time,
        key: i
      })
    }
    // const zexian = [
    //   { type: 'Performances数据流', year: '1991', value: 3 },
    //   { type: 'Performances数据流', year: '1992', value: 4 },
    //   { type: 'Performances数据流', year: '1993', value: 3.5 },
    //   { type: 'Performances数据流', year: '1994', value: 5 },
    //   { type: 'Performances数据流', year: '1995', value: 4.9 },
    //   { type: 'Performances数据流', year: '1996', value: 6 },
    //   { type: 'Performances数据流', year: '1997', value: 7 },
    //   { type: 'Performances数据流', year: '1998', value: 9 },
    //   { type: 'Performances数据流', year: '1999', value: 13 },
    //   { type: 'Performances数据流', year: '1999', value: 16 },
    //   { type: '序列2', year: '1991', value: 6 },
    //   { type: '序列2', year: '1992', value: 8 },
    //   { type: '序列2', year: '1993', value: 5.5 },
    //   { type: '序列2', year: '1994', value: 7 },
    //   { type: '序列2', year: '1995', value: 9.9 },
    //   { type: '序列2', year: '1996', value: 6 },
    //   { type: '序列2', year: '1997', value: 5 },
    //   { type: '序列2', year: '1998', value: 10 },
    //   { type: '序列2', year: '1999', value: 19 },
    //   { type: '序列3', year: '1991', value: 2 },
    //   { type: '序列3', year: '1992', value: 6 },
    //   { type: '序列3', year: '1993', value: 9 },
    //   { type: '序列3', year: '1994', value: 10 },
    //   { type: '序列3', year: '1995', value: 15 },
    //   { type: '序列3', year: '1996', value: 8 },
    //   { type: '序列3', year: '1997', value: 5 },
    //   { type: '序列3', year: '1998', value: 4.6 },
    //   { type: '序列3', year: '1999', value: 4 },
    // ];

    const cols2 = {
      name: { min: 0 },
      time: { range: [0, 1] },
    };
    return (
      <div>
        <Divider orientation="left">Performance Flow</Divider>
        <section style={{ display: 'flex', justifyContent: 'space-between', margin: 40 }}>
          <Chart height={300} width={"45%"} data={display} scale={cols1} forceFit>
            <Axis name="name" />
            <Axis name="time" />
            <Tooltip />
            <Geom type="interval" position="name*time" />
          </Chart>
          <Chart
            // filter={[['type', (t: string) => {
            //   if (t === '序列1') return true;
            //   return false;
            // }]]}
            height={300}
            width={"45%"}
            data={line}
            scale={cols2}
            forceFit
          >
            <Axis name="name" />
            <Axis name="time" />
            <Legend />
            <Tooltip crosshairs={{ type: 'y' }} />
            <Geom type="line" position="name*time" size={2} color="type" />
            <Geom
              type="point"
              position="name*time"
              size={4}
              shape={'circle'}
              style={{ stroke: '#fff', lineWidth: 1 }}
              color="type"
            />
          </Chart>
        </section>
        <Divider orientation="left">PV & UV Analysis</Divider>
        <section style={{ margin: '0 auto', width: '96%' }}>
          <Table style={{ width: '100%' }} columns={columns} dataSource={_analysis} size="small" />
        </section>
      </div>

    );
  }
}

