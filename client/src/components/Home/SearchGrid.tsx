import React from 'react';
import { WithStyles, Card, CardActionArea, CardMedia, GridList, GridListTile, CardContent, Typography, withStyles } from '@material-ui/core';
import { HeroPanelStyles } from './styles';

type SearchResultsProps = 
  { data: Artwork[], 
    targets: string[], 
    handleClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void } 
  & WithStyles<typeof HeroPanelStyles>;

const SearchGrid: React.SFC<SearchResultsProps> = (props:SearchResultsProps) => (
  <GridList cols={3} spacing={30} cellHeight={450} >
    { props.targets.map(r => {
      const art = props.data[props.data.map(a => a.id).indexOf(r)];
      return (
        <GridListTile key={art.id} cols={1}>
          <Card className={props.classes.resultImage}>
            <CardActionArea onClick={props.handleClick} id={art.id}>
              <CardMedia
                component="img"
                className={props.classes.media}
                image={`/img/${art.id}.jpg`}
                title={art.title}
              />
            </CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h4">
                {art.title} by {art.artist}
              </Typography>
            </CardContent>
          </Card>
        </GridListTile>
      );
    }) }
  </GridList>
);
export default withStyles(HeroPanelStyles)(SearchGrid);