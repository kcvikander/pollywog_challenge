import React from 'react';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import Close from '@material-ui/icons/Close';
import classNames from 'classnames';
import { HeroPanelStyles } from './styles';
import SearchGrid from './SearchGrid';
import { withStyles, InputBase, WithStyles, Fab, Grow } from '@material-ui/core';
import { IApplicationState } from '../../store/_configure';
import * as ArtworkStore from '../../store/ArtworkStore';
type HeroPanelProps = 
  IApplicationState
  & typeof ArtworkStore.actionCreators
  & { buttonClickHandler: () => void; 
      artClickHandler: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void; 
      showButton: boolean }
  & WithStyles<typeof HeroPanelStyles>;

type HeroPanelState = { searchFocus: boolean, search: string }

class HeroPanel extends React.Component<HeroPanelProps, HeroPanelState> {
  private timer: NodeJS.Timeout | undefined;
  constructor(props:HeroPanelProps){
    super(props);
    this.timer = undefined;
    this.state = { searchFocus: false, search: '' };
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
  }
  componentDidMount(){
    this.setState({ searchFocus: false })
  }
  onFocus = () => {
    this.props.clearSearch();
    this.setState({ searchFocus: true });
  }
  onBlur = () => {
    this.setState({ searchFocus: false });
  }
  handleSearchInput = (event: React.ChangeEvent <HTMLInputElement>) => {
    if (this.timer) { clearTimeout(this.timer) }; 
    this.setState({ search: event.currentTarget.value });
    this.timer  = setTimeout(() => { this.onSearch(); }, 500);
  }
  onSearch = () => {
    this.props.search(this.state.search);
  }
  render = () => {
    const { classes } = this.props;
    const { searchFocus, search } = this.state;
    const { records, searchResults } = this.props.Artwork;
    return (
      <div className={classes.root}>
        <Typography component="h1" variant="h1" align="center">
          Minneapolis Institute of Art
        </Typography>
        <Grow in={searchFocus} timeout={400}>
          <div className={classNames(classes.fullscreen, { [classes.fullscreenShow]: searchFocus })}>
            <div className={classes.searchContainer} >
            { searchFocus ? 
              <InputBase
                placeholder="Search"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                onChange={this.handleSearchInput}
                value={search}
                autoFocus={true}
              />
            : <></>} 
             </div>
            { searchFocus && searchResults.length > 0 ? 
              <SearchGrid data={ records } targets={ searchResults } handleClick={ this.props.artClickHandler} />
            : <></>} 
            <Fab color="default" aria-label="close search" className={classes.closeFab} onClick={this.onBlur}>
              <Close />
            </Fab>
          </div>
        </Grow>
        <div className={classes.searchPlaceholder} onClick={this.onFocus}>
          <Typography component="h3" variant="h3" align="center">
            Search and Explore...
          </Typography>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
        </div>
        <div className={classes.divider} style={this.props.showButton ? {opacity:1} : {opacity:0}}>
          <Typography component="h3" variant="h3" align="center" gutterBottom>
            Need inspiration?
          </Typography>
          <Fab color="secondary" aria-label="explore" onClick={this.props.buttonClickHandler}>
            <ArrowDropDown /> 
          </Fab>
        </div>
      </div>
    );
  }
}

export default withStyles(HeroPanelStyles)(HeroPanel);