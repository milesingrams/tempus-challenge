import React, {Component} from 'react';
import MapGL, {FlyToInterpolator} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoibWlsZXNpbmdyYW1zIiwiYSI6ImNqd3BhODI1MDB3c3kzeG1nbmo4cWJnaTgifQ.6zhfe-mFV1l_4T6trjqjGg'; // Set your mapbox token here

export default class Map extends Component {
  state = {
    viewport: {
      latitude: 37.7751,
      longitude: -122.4193,
      zoom: 11,
      bearing: 0,
      pitch: 0
    }
  };

  onViewportChange = viewport =>
    this.setState({
      viewport: {...this.state.viewport, ...viewport}
    });

  goToLocation = (location) => {
    this.onViewportChange({
      latitude: location[0],
      longitude: location[1],
      zoom: 11,
      transitionInterpolator: new FlyToInterpolator(),
      transitionDuration: 3000
    });
  };

  render() {
    const {viewport, settings} = this.state;

    return (
      <MapGL
        {...viewport}
        {...settings}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={this.onViewportChange}
        dragToRotate={false}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      />
    );
  }
}
