import * as React from 'react';
import { IApplicationState } from '../../store/_configure';
import * as UserStore from '../../store/UserStore';
import * as ArtworkStore from '../../store/ArtworkStore';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { RouteComponentProps } from 'react-router-dom';
import styles from './styles';
import { WithStyles, Grid, Paper, Card, CardContent, Typography, withStyles, CircularProgress, CardMedia, Fab, List, ListItem, ListItemText, AppBar, Toolbar } from '@material-ui/core';
type ArtworkDetailProps =
    IApplicationState
    & typeof UserStore.actionCreators
    & typeof ArtworkStore.actionCreators
    & WithStyles<typeof styles>
    & RouteComponentProps<{}>; 

class ArtworkDetail extends React.Component<ArtworkDetailProps, {}> {
  componentDidMount = () => {
    const artId = this.props.location.pathname.split('detail/')[1];
    const match = this.props.Artwork.records.map(a => a.id).indexOf(artId ? artId : "undefined");
    if (artId && match === -1){
      this.props.fetchArtworkById(artId);
    }
  }
  onBack = () => {
    this.props.history.goBack();
  }
  toggleLike = () => {
    const artId = this.props.location.pathname.split('detail/')[1];
    this.props.toggleLike(artId);
  }
  render = () => {
    const artId = this.props.location.pathname.split('detail/')[1];
    const { classes, Artwork, User } = this.props;
    const art = Artwork.records[Artwork.records.map(a => a.id).indexOf(artId)];
    const liked = art ? User.likes.indexOf(art.id) > -1 : false;
    return !art ? <> <CircularProgress /></> : 
      <div className={classes.root} >
        <Grid container spacing={8} className={classes.container}>
          <Grid item xs={12} sm={6} md={6} lg={6} >
            <Paper>
              <CardMedia
                  component="img"
                  image={`/img/${art.id}.jpg`}
                  title={art.title}
                />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={3} md={3} lg={3}>
            <Card>
              <CardContent>
                <List>
                  <ListItem>
                    <ListItemText primary="Title" secondary={art.title} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Artist" secondary={art.artist} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Dated" secondary={art.dated} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Medium" secondary={art.medium} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Style" secondary={art.style} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Description" secondary={art.description} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Country of Origin" secondary={art.country} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Dimensions" secondary={art.dimension} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Info" />
                    <Typography>{art.text}</Typography>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <AppBar position="fixed" color="secondary" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <div className={classes.buttonContainer} >
              <Fab color="primary" aria-label="Back" onClick={this.onBack}>
                <ArrowBack />
              </Fab>
              <Fab color="secondary" aria-label="Like" className={classes.likeButton} onClick={this.toggleLike}>
                { liked ? <Favorite /> : <FavoriteBorder /> }
              </Fab>
            </div>
          </Toolbar>
        </AppBar>
      </div>  
  }
}
export default withStyles(styles)(ArtworkDetail);