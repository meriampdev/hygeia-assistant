import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { NavigationDrawer } from 'react-md';
import { toTitle } from '../../utils/strings';

import NavItemLink from '../NavItemLink';
import ContentCard from './ContentCard'

import Progress from '../../pages/Progress'
import RoadMap from '../../pages/RoadMap'
import Projects from '../../pages/Projects'

const TO_PREFIX = '/app';

const navItems = [
  {
    label: 'Projects',
    to: `${TO_PREFIX}/projects`,
    exact: true,
    icon: 'web',
    component: <Projects />
  },
  {
    label: 'Road Map',
    to: `${TO_PREFIX}/road-map`,
    exact: true,
    icon: 'track_changes',
    component: <RoadMap />
  },
  {
    label: 'Progress',
    to: `${TO_PREFIX}/progress`,
    exact: true,
    icon: 'pie_chart',
    component: <Progress />
  }
]

const styles = {
  content: { minHeight: 'auto' },
};

class RoutingExample extends PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired,
  };

  constructor(props) {
    super();

    this.state = { toolbarTitle: this.getCurrentTitle(props) };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ toolbarTitle: this.getCurrentTitle(nextProps) });
  }

  getCurrentTitle = ({ location: { pathname } }) => {
    const lastSection = pathname.substring(pathname.lastIndexOf('/') + 1);
    if (lastSection === 'navigation-drawers') {
      return 'Inbox';
    }

    return toTitle(lastSection);
  };

  render() {
    const { toolbarTitle } = this.state;
    const { location } = this.props;
    return (
      <NavigationDrawer
        toolbarTitle={toolbarTitle}
        mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY_MINI}
        tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
        desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
        navItems={navItems.map(props => <NavItemLink {...props} key={props.to} />)}
        contentId="main-demo-content"
        contentStyle={styles.content}
        contentClassName="md-grid"
      >
        <div className='page-content-container'>
        <Switch key={location.pathname}>
          {
            navItems.map((item) => {
              return <Route key={`navItem-${item.to}`} exact path={item.to} 
                component={() => item.component ? item.component : <ContentCard title={item.label} />} />
            })
          }
        </Switch>
        </div>
      </NavigationDrawer>
    );
  }
}
export default withRouter(RoutingExample);