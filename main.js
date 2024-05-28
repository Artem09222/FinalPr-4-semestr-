// function openModal(content) {
//     let modalContent = document.getElementById("modalContent");
//     modalContent.innerHTML = content; // Вставка вмісту карточки в модальне вікно

//     let modal = document.getElementById("myModal");
//     modal.style.display = "block";
// }

// // Функція для закриття модального вікна
// function closeModal() {
//     let modal = document.getElementById("myModal");
//     modal.style.display = "none";
// }

// // Додавання події клікання до кожної карточки
// let cards = document.querySelectorAll(".card");
// cards.forEach(card => {
//     card.addEventListener("click", function() {
//         let content = this.innerHTML;
//         openModal(content);
//     });
// });

// // Закриття модального вікна при кліканні за його межами
// window.onclick = function(event) {
//     let modal = document.getElementById("myModal");
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }

let cards = document.querySelectorAll('.card')
cards.forEach(card => {
  card.addEventListener('click', () => {
  openModal()
  })
})

let modal = document.querySelector('.modal')
function openModal() {
  modal.style.display = 'block'
  modal.innerHTML = `
  <img src="./Images/Rectangle 6 (1).png" alt="" class="modalImg" style="display: block; margin: auto; object-fit: cover;">
  <div class="divModalInfo">
    <h1 class="modalTitle" style="color: white; font-size: 20px; font-family: Verdana, Geneva, Tahoma, sans-serif;">INFO</h1>
    <p class="text-for-modalA" style="color: white; font-size: 20px; font-family: Verdana, Geneva, Tahoma, sans-serif;">VIP 1000-1500 UAH</p>
    <p class="modalInfo" style="color: white; font-size: 20px; font-family: Verdana, Geneva, Tahoma, sans-serif;">Atlas Weekend is the largest music festival in Ukraine. More than 200 artists will create a proper music festival atmosphere on 10 stages</p>
    <button class="btn-for-modalA">BUY TICKETS</button>  
  </div>
  `
  document.body.insertAdjacentHTML('beforeend', modal)
}

let close = document.querySelector('.close')
close.addEventListener('click', () => {
  modal.style.display = 'none'
})

window.onclick = function(event) {
  let modal = document.getElementById("myModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const pageNumbers = document.querySelectorAll('.thirdSectionInfo');
  const cardsPerPage = 6;

  pageNumbers.forEach(page => {
      page.addEventListener('click', () => {
          const pageNumber = parseInt(page.dataset.page);
          displayCards(pageNumber);
      });
  });

  function displayCards(pageNumber) {
      const allCards = document.querySelectorAll('.card');
      const startIndex = (pageNumber - 1) * cardsPerPage;
      const endIndex = pageNumber * cardsPerPage;

      allCards.forEach((card, index) => {
          if (index >= startIndex && index < endIndex) {
              card.style.display = 'block';
          } else {
              card.style.display = 'none';
          }
      });
  }

  const backBtn = document.getElementById('.active');
  backBtn.addEventListener('click', () => {
      const pageNumber = parseInt(pageNumbers[0].dataset.page);
      if (pageNumber <= 1) {
          displayAllCards();
      } else {
          displayCards(pageNumber - 1);
      }
  });

  function displayAllCards() {
      const allCards = document.querySelectorAll('.card');
      allCards.forEach(card => {
          card.style.display = 'block';
      });
  }
});

const headSelect = document.querySelector('.headSelect');
const filmsContent = document.querySelector('.filmsContent');

async function getConcerts(countryCode) {
    try {
      const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?countryCode=${countryCode}&apikey=D9dT71LdTC1wOKwX0OBANeezmoFJm65E`);
      if (!response.ok) {
        throw new Error('Failed to fetch concerts');
      }
      const concertData = await response.json();
  
      filmsContent.innerHTML = "";
  
      const seenImages = new Set(); // Множина для відстеження унікальних зображень
  
      concertData._embedded.events.forEach(concert => {
        const imageUrl = concert.images[0].url;
        if (!seenImages.has(imageUrl)) {
          seenImages.add(imageUrl);
          filmsContent.innerHTML += `
            <div class="film" style="max-width: 700px; display: flex; justify-content: center; align-items: center; gap: 10px; width: 100%;">
              <img src="${imageUrl}" class="film-img" style="object-fit: cover;">
              <div class="film-info">
                <h5 class="film-title" style="color: white">${concert.name}</h5>
                <p class="film-date" style="color: white">${concert.dates.start.localDate}</p>
                <p class="film-place" style="color: white">
                  <img src="./img/filmSvg.svg" alt="Location Icon" onerror="this.style.display='none'">
                  ${concert._embedded.venues[0].name}
                </p>
              </div>
            </div>
          `;
        }
      });
  
      // Видаляємо початкові картки
      cards.forEach(card => {
        card.style.display = 'none';
      });
  
    } catch (error) {
      console.error('Error fetching concerts:', error);
    }
  }
  
  async function populateCountries() {
    try {
      const response = await fetch("https://app.ticketmaster.com/discovery/v2/classifications.json?apikey=D9dT71LdTC1wOKwX0OBANeezmoFJm65E");
      if (!response.ok) {
        throw new Error('Failed to fetch countries');
      }
      const data = await response.json();
      const classifications = data._embedded.classifications;
  
      const optionUS = document.createElement('option');
      optionUS.value = 'US';
      optionUS.textContent = 'United States';
      headSelect.appendChild(optionUS);
  
      const optionCA = document.createElement('option');
      optionCA.value = 'CA';
      optionCA.textContent = 'Canada';
      headSelect.appendChild(optionCA);
  
      const optionFrance = document.createElement('option');
      optionFrance.value = 'FR';
      optionFrance.textContent = 'France';
      headSelect.appendChild(optionFrance);
  
      headSelect.addEventListener('change', async (e) => {
        const countryCode = e.target.value;
        await getConcerts(countryCode);
      });
    } catch (error) {
      console.error('Error populating countries:', error);
    }
  }
  
  populateCountries();
  
document.addEventListener('DOMContentLoaded', function () {
  const input = document.querySelector('.firstSectionInput');

  input.addEventListener('input', () => {
      const searchTerm = input.value.toLowerCase();
      const cards = document.querySelectorAll('.card');

      cards.forEach(card => {
          const title = card.querySelector('.cardTitle').textContent.toLowerCase();
          const miniTitle = card.querySelector('.cardMiniTitle').textContent.toLowerCase();
          const cardText = card.querySelector('.cardText').textContent.toLowerCase();

          if (title.includes(searchTerm) || miniTitle.includes(searchTerm) || cardText.includes(searchTerm)) {
              card.style.display = 'block';
          } else {
              card.style.display = 'none';
          }
      });
  });
});

