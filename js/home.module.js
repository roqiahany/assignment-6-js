import { Details } from './details.module.js';
import { Ui } from './ui.module.js';

export class Home {
  constructor() {
    document.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        this.changeActiveLink(link);

        // const category = link.getAttribute('data-category');
        //!!!!!!!!!!!!((or))!!!!!!!!!! //
        const category = link.dataset.category;
        this.getApiGame(category);
      });
    });

    this.loading = document.getElementById('loading');
    this.ui = new Ui();
    this.details = new Details();
    this.getApiGame('mmorpg');
    this.details = document.getElementById('details');
    this.home = document.getElementById('home');
  }

  changeActiveLink(link) {
    document.querySelector('.navbar-nav .active').classList.remove('active');
    link.classList.add('active');
  }

  async getApiGame(categ) {
    this.loading.classList.remove('d-none');
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'f30e302adcmsh2f10a7a1d814eb9p119d18jsn5bcd3099ac2f',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
      },
    };

    const myApi = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${categ}`,
      options
    );
    let response = await myApi.json();

    console.log(response);
    this.ui.displayGames(response);
    this.loading.classList.add('d-none');

    document.querySelectorAll('.card').forEach((card) => {
      card.addEventListener('click', () => {
        this.details.classList.remove('d-none');
        this.home.classList.add('d-none');
        new Details(card.dataset.id);
      });
    });
  }
}
