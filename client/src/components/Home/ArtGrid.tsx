import React from 'react';
import {  WithStyles, withStyles, GridList, GridListTile } from '@material-ui/core';
import { IApplicationState } from '../../store/_configure';
import { ArtGridStyles } from './styles';
import * as UserStore from '../../store/UserStore';
import * as ArtworkStore from '../../store/ArtworkStore'; 

type ArtGridProps = 
  IApplicationState
  & typeof UserStore.actionCreators
  & typeof ArtworkStore.actionCreators
  & WithStyles<typeof ArtGridStyles>
  & { handleClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void; };

class ArtGrid extends React.Component<ArtGridProps, {}> {
  render(){
    const { classes, Artwork } = this.props;
    const list = this.props.Artwork.dashboardList.map(dashboardId => {
      return Artwork.records[Artwork.records.map(a => a.id).indexOf(dashboardId)];
    });   

    return (
      <GridList cols={3} spacing={30} cellHeight={400} className={classes.gridList}>
        {list.map(art => {
          return ( 
            <GridListTile key={art.id} cols={1} onClick={this.props.handleClick} id={art.id}>
              <img src={`/img/${art.id}.jpg`} alt={art.title} />
            </GridListTile>
          )
        })}
      </GridList>
    )
  }
}
export default withStyles(ArtGridStyles)(ArtGrid);