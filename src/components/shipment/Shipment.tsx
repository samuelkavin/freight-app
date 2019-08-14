import React, { Component } from 'react';
import axios from 'axios';
import ShipmentList from './../shipmentList/ShipmentList';

import { Card, TextField } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import './Shipment.scss';

interface ListInterface {
  list: any[];
  value: any;
}

const statuses: string[] = ['New', 'Completed', 'Active'];

const statusList = statuses.map((status, index) => {
  return (
    <div key={index} className="Card-Content__SearchBar--status">
      <span className={status} />
      <span>{status}</span>
    </div>
  );
});

export class Shipment extends Component<object, ListInterface> {
  constructor(props: any) {
    super(props);
    this.state = {
      list: [] as any[],
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getShipmentList();
  }

  componentWillReceiveProps(nextProps: any) {
    this.setState({
      list: nextProps.list
    });
  }

  getShipmentList() {
    axios.get('http://localhost:3001/shipments').then((res: any) => {
      this.setState({ list: res.data });
    });
  }

  handleChange(e: any) {
    let list = this.state.list.concat();
    const { value } = e.target;

    if (value) {
      list = list.filter((item: any) => {
        const name = item.name.toLowerCase();
        const id = item.id.toLowerCase();
        const filter = value.toLowerCase();
        return name.includes(filter) || id.includes(filter);
      });
    }

    this.setState({
      list
    });

    if (!value) {
      this.getShipmentList();
    }
  }

  render() {
    return (
      <div>
        <Card className="Card">
          <CardContent className="Card-Content">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <div className={`Card-Content__SearchBar`}>{statusList}</div>
                <div className="Card-Content__Location">
                  <TextField
                    id="outlined-name"
                    label="Search"
                    margin="normal"
                    variant="outlined"
                    fullWidth={true}
                    onChange={this.handleChange}
                  />
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        {this.state.list.map((item: any, index: number) => (
          <ShipmentList key={index} value={item} />
        ))}
      </div>
    );
  }
}

export default Shipment;
