import { Theme, createStyles } from "@material-ui/core";
import { fade } from '@material-ui/core/styles/colorManipulator';
// Theme-dependent styles
export const HomeStyles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  }
});
export const ArtGridStyles = (theme: Theme) => createStyles({
  root: {
    color: theme.palette.primary.contrastText
  },
  gridList: {
    marginLeft: theme.spacing.unit * 10,
    marginRights: theme.spacing.unit * 10,
  },
  imageText: {
    display: 'flex',
    flexDirection:'column',
    alignContent: 'center',
  },
  imageContainer: {
    display: 'flex',
    flexDirection:'column',
    alignContent: 'center'
  }
});

export const HeroPanelStyles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: `calc(100vh - ${theme.spacing.unit * 20}px)`,
    color: theme.palette.primary.contrastText,
    margin: theme.spacing.unit * 20
  },
  searchPlaceholder: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    borderWidth: '1px',
    borderColor: theme.palette.primary.contrastText,
    borderStyle: 'solid',
    width: '80%',
    height: '75px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',   
    cursor:'text'
  },
  fullscreen: {
    position:'fixed',
    overflow: 'scroll',
    left: '0',
    top: '0',
    width: '100vw',
    height: '300vh',
    backgroundColor: fade(theme.palette.primary.light, 1),
    zIndex: 0
  },
  fullscreenShow: {
    zIndex:10
  },
  searchContainer: {
    height: '100px',
  },
  divider: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'opacity 5s ease',
    justifySelf: 'flex-end',
    marginTop: 'auto' 
  },
  searchIcon: {
    width: theme.spacing.unit * 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
    height: '100px'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit * 10,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    transition: theme.transitions.create('width'),
    width: '100%',
    textAlign: 'center',
    fontSize: '40pt',
    color: theme.palette.primary.dark
  },
  resultImage: {
    position: 'relative',
    overflow: 'hidden',
    height:'100%',
    width:'100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  media: {
    maxHeight: '400px',
    cursor:'pointer'
  },
  closeFab: {
    position:'absolute',
    right: '20px',
    top: '20px'
  }
});