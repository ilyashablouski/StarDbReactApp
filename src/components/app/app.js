import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';

import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-service';

import ErrorBoundry from '../error-boundry';
import Row from '../row';

import ItemList from '../item-list';


import './app.css';
import ItemDetails, { Record } from '../item-details/item-details';
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
      getStarshipImage,
      getAllPeople,
      getAllPlanets } = this.swapiService;

    const personDetails = (
      <ItemDetails
        itemId={11}
        getData={getPerson}
        getImageUrl={getPersonImage}
      // Здесь в комменте описано, как можно передать значения
      // полей (options),но не нужно, кот-е
      // необходимо взять из объекта item, а так же его имя в интерфейсе
      // Что взять? Как это будет выглядеть? 
      // fields={
      //   [
      //     { field: 'gender', label: 'Gender' },
      //     { field: 'birthYear', label: 'Birth Year' },
      //     { field: 'eyeColor', label: 'Eye Color' },
      //   ]
      // }
      >

        {/* Более правильный вариант, передавать всё через дочерний комп-т: */}
        <Record field="gender" label='Gender:' />
        <Record field="birthYear" label='Birth Year:' />
        <Record field="eyeColor" label='Eye Color:' />

      </ItemDetails>
    );

    const starshipDetails = (
      <ItemDetails
        itemId={5}
        getData={getStarship}
        getImageUrl={getStarshipImage}
      // fields={
      //   [
      //     { field: 'costInCredits', label: 'Сost in Credits' },
      //     { field: 'length', label: 'Length' },
      //     { field: 'passengers', label: 'Passengers' },
      //   ]
      // } 
      >
        <Record field="costInCredits" label='Сost in Credits:' />
        <Record field="length" label='Length:' />
        <Record field="passengers" label='Passengers:' />
      </ItemDetails>
    );

    return (
      <ErrorBoundry>
        <div className="stardb-app">
          <Header />


          <ItemList
            getData={getAllPeople}
            // Передали сверху по иерархии ф-цию, чтобы вызвать снизу
            // и передать аргуметы вверх
            onItemSelected={() => { }}>

            {({ name }) => <span>{name}</span>}
          </ItemList>

          <ItemList
            getData={getAllPlanets}
            onItemSelected={() => { }}>

            {({ name }) => <span>{name}</span>}
          </ItemList>

          {/* <Row
            left={personDetails}
            right={starshipDetails} /> */}
        </div>
      </ErrorBoundry>
    );
  }
}
