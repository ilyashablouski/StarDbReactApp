
/**
 *  Creating individual API (encapsulating methods in class) for work with
 *  data from server
 */
class SwapiServise {
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
    return res.results;
  }

  getPerson(id) {
    return this.getResource(`/people/${id}/`);
  }

  async getAllPlanet() {
    const res = await this.getResource(`/planets/`);
    return res.results;
  }

  getPlanet(id) {
    return this.getResource(`/planets/${id}/`);
  }

  async getAllStarships() {
    const res = await this.getResource(`/starships/`);
    return res.results;
  }

  getStarship(id) {
    return this.getResource(`/starships/${id}/`);
  }
}

const swapi = new SwapiServise();
swapi.getPerson(3).then((p) => {
  console.log(p.name);
});
swapi.getPlanet(1).then((planet) => {
  console.log(planet.name);
});
swapi.getStarship(9).then((starship) => {
  console.log(starship.name);
});

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





