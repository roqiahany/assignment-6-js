import { Ui } from './ui.module.js';

export class Details {
  constructor(id) {
    document.getElementById('btnClose').addEventListener('click', () => {
      document.getElementById('details').classList.add('d-none');
      document.getElementById('home').classList.remove('d-none');

      console.log('ho');
    });
    this.loading = document.getElementById('loading');
    this.getApiDetails(id);
  }

  async getApiDetails(id) {
    this.loading.classList.remove('d-none');
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'f30e302adcmsh2f10a7a1d814eb9p119d18jsn5bcd3099ac2f',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
      },
    };
    const api = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
      options
    );

    let response = await api.json();
    new Ui().displayDetails(response);
    this.loading.classList.add('d-none');
    console.log(response);
  }
}
