import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { withStyles, CircularProgress, WithStyles } from '@material-ui/core';
import { IApplicationState } from '../../store/_configure';
import * as UserStore from '../../store/UserStore';
import * as ArtworkStore from '../../store/ArtworkStore';
import { HomeStyles } from './styles';
import HeroPanel from './HeroPanel';
import ArtGrid from './ArtGrid';

type HomeProps =
    IApplicationState
    & typeof UserStore.actionCreators
    & typeof ArtworkStore.actionCreators
    & WithStyles<typeof HomeStyles>
    & RouteComponentProps<{}>;

type HomeState = {
  showButton: boolean
}
class Home extends React.Component<HomeProps, HomeState> {
  private scrollRef: React.RefObject<HTMLDivElement>;
  constructor(props:HomeProps){
    super(props);
    this.state = { showButton: true };
    this.scrollRef = React.createRef();
    this.handleArtClick = this.handleArtClick.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.scrollListen = this.scrollListen.bind(this);
    window.addEventListener("scroll", this.scrollListen);
  }
  componentDidMount(){
    this.props.fetchRandom(12);
  }
  componentWillUnmount(){
    window.removeEventListener("scroll", this.scrollListen);
  }
  scrollListen( ){
    if(window.scrollY < 550 && !this.state.showButton){
      this.setState({ showButton: true });
    }
  }
  handleArtClick(event: React.MouseEvent<HTMLLIElement, MouseEvent>){
    this.props.history.push(`/detail/${event.currentTarget.id}`);
  }
  handleButtonClick(){
    window.scrollTo({
      top: this.scrollRef.current!.offsetTop,
      behavior: "smooth"
    });
    this.setState({showButton: false});
  }
  render() {
    return (
      <div className={this.props.classes.root}>
        <HeroPanel {...this.props} buttonClickHandler={this.handleButtonClick} artClickHandler={this.handleArtClick} showButton={this.state.showButton} />
        <div ref={this.scrollRef} />
        { this.props.Artwork.loading || this.props.Artwork.records.length < 10 ? <CircularProgress /> :
          <ArtGrid {...this.props} handleClick={this.handleArtClick} />
        }
      </div>
    );
  }
}
export default withStyles(HomeStyles)(Home);