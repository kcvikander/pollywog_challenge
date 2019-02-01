import React, { ReactNode } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme, Theme } from '@material-ui/core';
import { RouteComponentProps } from 'react-router';

const theme: Theme = createMuiTheme({
  palette: {
    primary: {
      light: '#74747e',
      main: '#33333e',
      dark: 'rgba(0, 0, 0, 0.26)',
      contrastText: 'rgba(255, 255, 255, 1)',
    },
    secondary: {
      light: '#448aff',
      main: '#0d47a1',
      dark: '#2979ff',
      contrastText: '#9e9e9e',
    }
  },
  typography: {
    useNextVariants: true,
    h1: {
      color: 'rgba(255, 255, 255, 1)',
    },
    h2: {
      color: 'rgba(255, 255, 255, 1)',
    },
    h3: {
      fontSize: '22pt',
      color: 'rgba(255, 255, 255, 1)',
    },
    h4: {
      fontSize: '12pt',
      textAlign: 'center'
    },
    h5: {
      fontSize: '10pt',
      textAlign: 'center'
    }
  }   
});
type LayoutProps = 
  { children: ReactNode; }
  & RouteComponentProps<{}>;
class Layout extends React.Component<LayoutProps, {}> {
  componentDidUpdate(prevProps:LayoutProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }
  render = () => {
    return (
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          { this.props.children }
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

export default Layout;

