import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from '../people-page';
import ErrorIndicator from '../error-indicator';

import './app.css';
import ErrorButton from '../error-button/error-button';

export default class App extends Component {

  state = {
    showRandomPlanet: true,
    hasError: false //флаг возникновения ошибки в setState|| render || МЖЦ
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };

  componentDidCatch(error, info) {
    debugger;

    console.log('componentDidCatch()');
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />
    }

    const planet = this.state.showRandomPlanet ?
      <RandomPlanet /> :
      null;

    return (
      <div className="stardb-app">
        <Header />
        {planet}
        <div className="row mb2 button-row">
          <button
            className="toggle-planet btn btn-warning btn-lg"
            onClick={this.toggleRandomPlanet}>
            Toggle Random Planet
        </button>
          <ErrorButton />
        </div>

        <PeoplePage />
        <PeoplePage />
        <PeoplePage />
      </div>
    );
  }
}
