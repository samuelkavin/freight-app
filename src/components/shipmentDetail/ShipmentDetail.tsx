import React, { Component } from 'react';
import './ShipmentDetail.scss';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import './ShipmentDetail.scss';
import axios from 'axios';
import CargoList from '../cargoList/CargoList';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
interface ShipmentInterface {
  detail: any;
  param: any;
}

export class ShipmentDetail extends Component<any, ShipmentInterface> {
  constructor(props: any) {
    super(props);

    this.state = {
      detail: '',
      param: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  onBack = () => {
    this.props.history.goBack();
  };

  componentDidMount() {
    this.getShipmentDetail();
  }

  getShipmentDetail() {
    let { params } = this.props.match;
    params = params.id;
    axios
      .get(`http://localhost:3001/shipments/${params}`)
      .then((response: any) => {
        this.setState({
          detail: response.data
        });
      })
      .catch((err: any) => {
        alert('Something went wrong!');
      });
  }

  onUpdate(e: any) {
    e.preventDefault();
    axios
      .put(
        `http://localhost:3001/shipments/${this.state.detail.id}`,
        this.state.detail
      )
      .then((res: any) => {
        alert('Successfully updated!');
      })
      .catch((err: any) => {
        alert('Something went wrong!');
      });
  }

  handleChange = (event: any) => {
    event.preventDefault();
    this.setState({
      detail: {
        ...this.state.detail,
        name: event.target.value
      }
    });
  };

  render() {
    const {
      name,
      id,
      mode,
      total,
      type,
      origin,
      destination
    } = this.state.detail;
    return (
      <Card className="Card">
        <CardContent className="Card-Content">
          <Grid container spacing={3}>
            <Grid item xs={6} className="Card-Content__Back">
              <span onClick={this.onBack}>
                <i className="material-icons">keyboard_arrow_left</i>
              </span>
            </Grid>
            <Grid item xs={6} className="Card-Content__Id">
              <span>[ {id} ]</span>
            </Grid>
            <Grid item xs={12}>
              <div className="Card-Content__Header">
                <TextField
                  id="outlined-name"
                  label="Name"
                  value={name || ''}
                  className="Card-Content__Header--Title"
                  onChange={this.handleChange}
                  fullWidth={true}
                  margin="normal"
                  variant="outlined"
                />
                {/* <h3 className="Card-Content__Header--Title">{name}</h3> */}
              </div>
              <div className="Card-Content__Location">
                <span className="Card-Content__Location--origin">{origin}</span>
                <span className="Card-Content__Location--to"> to </span>
                <span className="Card-Content__Location--dest">
                  {destination}
                </span>
              </div>
            </Grid>
            <Grid item xs={3}>
              <span>Mode: {mode}</span>
            </Grid>
            <Grid item xs={3}>
              <span>Total: ${total}</span>
            </Grid>
            <Grid item xs={3}>
              <span>Type: {type}</span>
            </Grid>
            <Grid item xs={12} className="Card-Content__Table">
              {this.state.detail &&
                this.state.detail.cargo.map((item: any, index: number) => (
                  <CargoList key={index} value={item} />
                ))}
            </Grid>
          </Grid>
        </CardContent>
        <CardActions className="Card-Action">
          <Button size="large" color="primary">
            Cancel
          </Button>
          <Button
            size="large"
            color="primary"
            onClick={e => this.onUpdate(e)}
            variant="outlined"
          >
            Save
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default ShipmentDetail;
