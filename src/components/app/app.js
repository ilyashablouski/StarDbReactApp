import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';

import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-service';

import ErrorBoundry from '../error-boundry';
import Row from '../row';

import './app.css';
import ItemDetails from '../item-details';

export default class App extends Component {

  swapiService = new SwapiService();

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


    //refactoring
    const { getPerson,
      getStarship,
      getPersonImage,
      getStarshipImage } = this.swapiService;

    const personDetails = (
      <ItemDetails
        itemId={11}
        getData={getPerson}
        getImageUrl={getPersonImage}
        // Здесь можно передать значения полей (options), кот-е
        // необходимо взять из объекта item, а так же его имя в интерфейсе
        // Что взять? Как это будет выглядеть? 
        fields={
          [
            { field: 'gender', label: 'Gender' },
            { field: 'birthYear', label: 'Birth Year' },
            { field: 'eyeColor', label: 'Eye Color' },
          ]
        }
      />
    );

    const starshipDetails = (
      <ItemDetails
        itemId={5}
        getData={getStarship}
        getImageUrl={getStarshipImage}
        fields={
          [
            { field: 'costInCredits', label: 'Сost in Credits' },
            { field: 'length', label: 'Length' },
            { field: 'passengers', label: 'Passengers' },
          ]
        } />
    );

    return (
      <ErrorBoundry>
        <div className="stardb-app">
          <Header />


          {/* {planet}
          <div className="row mb2 button-row">
            <button
              className="toggle-planet btn btn-warning btn-lg"
              onClick={this.toggleRandomPlanet}>
              Toggle Random Planet
            </button>
            <ErrorButton />
          </div> */}

          {/* <PeoplePage /> */}

          <Row
            left={personDetails}
            right={starshipDetails} />
        </div>
      </ErrorBoundry>
    );
  }
}
