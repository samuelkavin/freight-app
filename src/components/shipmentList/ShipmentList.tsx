import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import './ShipmentList.scss';

interface ShipmentListInterface {
  key: any;
  value: any;
}

export class ShipmentList extends Component<ShipmentListInterface> {
  render() {
    const { name, origin, destination, id, status } = this.props.value;
    return (
      <Card className="Card">
        <CardContent className="Card-Content">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <div className="Card-Content__Header">
                <h3 className="Card-Content__Header--Title">
                  <span className={`Card-Content__Header--Status ${status}`} />
                  {name}
                </h3>
                <Link to={`/list/${id}`}>
                  <span className="Card-Content__Header--Id">[ {id} ]</span>
                </Link>
              </div>
              <div className="Card-Content__Location">
                <span className="Card-Content__Location--origin">{origin}</span>
                <span className="Card-Content__Location--to"> to </span>
                <span className="Card-Content__Location--dest">
                  {destination}
                </span>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

export default ShipmentList;
