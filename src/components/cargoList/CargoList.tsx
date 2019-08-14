import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import fabric from './../../assests/fabric.svg';
import lamp from './../../assests/lamp.svg';
import furniture from './../../assests/furniture.svg';

interface CargoListInterface {
  key: any;
  value: any;
}

export class CargoList extends Component<CargoListInterface> {
  getImage() {
    if (this.props.value.type === 'Fabric') {
      return fabric;
    }

    if (this.props.value.type === 'Furniture') {
      return furniture;
    }

    if (
      this.props.value.type !== 'Furniture' ||
      this.props.value.type !== 'Fabric'
    ) {
      return lamp;
    }
  }

  render() {
    const { volume, type, description } = this.props.value;
    return (
      <List>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={this.getImage()} src={this.getImage()} />
          </ListItemAvatar>
          <ListItemText
            primary={`${type} ( ${volume} )`}
            secondary={<React.Fragment>{description}</React.Fragment>}
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
    );
  }
}

export default CargoList;
