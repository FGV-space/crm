import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setTitle, setSitenav, closeAll, toggleDashboard } from '../../App/appSlice';
import { Responsive, WidthProvider } from 'react-grid-layout';
import Weather from "../components/Weather/Weather";
import Widget from "../components/Widget/Widget";
import Maps from "../components/Maps/Maps";

const ResponsiveGridLayout = new WidthProvider(Responsive);

class DashboardMainPage extends Component {
  state = {
    dashboard: [],
    timestamp: new Date().getTime(),
    isDashboardReady: false,
  };

  componentDidMount() {
    this.props.setTitle('Dashboard');
    this.props.setSitenav([
      { url: '/dashboard', title: 'Dashboard' }]);
    this.props.closeAll();
    this.setDashboardReady();
  }

  onDragStop = (grid) => {
    if (grid) {
      console.log(grid);
    }
  };

  onResizeStop = (grid) => {
    if (grid) {
      this.setState({ timestamp: new Date().getTime() });
    }
  };

  setDashboardReady = () => {
    this.setState({ isDashboardReady: true });
  };

  render() {
    return (
      <div>
        <Weather />
        <ResponsiveGridLayout
          className={'dashboard'}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 12, sm: 6, xs: 4, xxs: 2 }}
          onDragStop={this.onDragStop}
          onResizeStop={this.onResizeStop}
          isDraggable={this.props.editDashboard}
          isResizable={this.props.editDashboard}
        >
          <div
            key={'a'}
            className={'dashboard__widget'}
            data-grid={{ x: 0, y: 0, w: 6, h: 4 }}
          >
            <Widget
              timestamp={this.state.timestamp}
              widgetTitle={'Test'}
            >
              <div>&nbsp;</div>
            </Widget>
          </div>
          <div
            key={'b'}
            className={'dashboard__widget'}
            data-grid={{ x: 6, y: 0, w: 6, h: 4 }}
          >
            <Widget
              timestamp={this.state.timestamp}
              widgetTitle={'Mappa'}
            >
              {this.state.isDashboardReady && <Maps />}
            </Widget>
          </div>
          <div
            key={'c'}
            className={'dashboard__widget'}
            data-grid={{ x: 0, y: 4, w: 6, h: 4 }}
          >
            &nbsp;
          </div>
          <div
            key={'d'}
            className={'dashboard__widget'}
            data-grid={{ x: 6, y: 4, w: 6, h: 4 }}
          >
            &nbsp;
          </div>
        </ResponsiveGridLayout>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    editDashboard: state.app.editDashboard,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setTitle: (title) => dispatch(setTitle(title)),
    setSitenav: (sitenav) => dispatch(setSitenav(sitenav)),
    closeAll: () => dispatch(closeAll()),
    toggleDashboard: () => dispatch(toggleDashboard()),
  };
};

DashboardMainPage.propTypes = {
  setTitle: PropTypes.func.isRequired,
  setSitenav: PropTypes.func.isRequired,
  closeAll: PropTypes.func.isRequired,
  editDashboard: PropTypes.bool.isRequired,
  toggleDashboard: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardMainPage);
