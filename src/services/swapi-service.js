
/**
 *  Creating individual API (encapsulating methods in class) for work with
 *  data from server
 */
export default class SwapiServise {
  //_нижнПодчерк - code convention for private class usage
  _apiBase = 'https://swapi.dev/api';

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      // Возвращаем собственную ошибку, если ответ от с-ра не сожержит код от 200 до 299
      throw new Error(`Could not fetch ${url}, ${res.status}`)
    }
    return await res.json();
  }

  async getAllPeople() {
    const res = await this.getResource(`/people/`);
    return res.results.map(this._transformPerson);
  }

  async getPerson(id) {
    const person = await this.getResource(`/people/${id}/`);
    return this._transformPerson(person);
  }

  async getAllPlanet() {
    const res = await this.getResource(`/planets/`);
    return res.results.map(this._transformPlanet);
  };


  async getPlanet(id) {
    const planet = await this.getResource(`/planets/${id}/`);
    return this._transformPlanet(planet);
  }

  async getAllStarships() {
    const res = await this.getResource(`/starships/`);
    return res.results.map(this._transformStarship);
  }

  async getStarship(id) {
    const starship = await this.getResource(`/starships/${id}/`);
    return this._transformStarship(starship);
  }

  // Отдельная функция для выделения id из url
  _extractId(item) {
    const idRegExp = /\/([0-9]*)\/$/;
    return item.url.match(idRegExp)[1];
  }

  _transformPlanet(planet) {
    return {
      id: this._extractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter
    }
  }

  _transformStarship(starship) {
    return {
      id: this._extractId(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.cost_in_credits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargoCapacity
    }
  }

  _transformPerson(person) {
    return {
      id: this._extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birth_year,
      eyeColor: person.eye_color
    }
  }
}

/**
 * Example work with fetch
 */
// fetch('http://swapi.dev/api/people/1/')
//   // Метод then сработает после разрешения асинхронных вычислений
//   // и возвращения результата в promise-объект (в
//   // данном случае объект response), после чего можно
//   // вызвать метод (напр. res.json())
//   // который возвращает promise уже тогда, когда извлекся json, текстовая
//   // инф-я от сервера и т.д.
//   .then((res) => {
//     return res.json();
//   })
//   .then((body) => {
//     console.log(body);
//   });





