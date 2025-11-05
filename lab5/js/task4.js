(function () {
const imagesArray = [
  { path: 'images/team1.jpg', title: 'FC Dynamo', description: 'Домашній стадіон' },
  { path: 'images/team2.jpg', title: 'FC Shakhtar', description: 'Атакувальна гра' },
  { path: 'images/team3.jpg', title: 'FC Metalist', description: 'Молода команда' },
  { path: 'images/team4.jpg', title: 'FC Lviv', description: 'Надійна оборона' },
  { path: 'images/team5.jpg', title: 'FC Karpaty', description: 'Традиції та історія' }
];
function initPhotoRotator(containerId, images) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const frame = document.createElement('div');
    frame.className = 'photo-frame';
    const counter = document.createElement('div');
    counter.className = 'photo-counter';
    frame.appendChild(counter);
    const content = document.createElement('div');
    content.className = 'photo-content';
    const prevLink = document.createElement('a');
    prevLink.className = 'nav-link';
    prevLink.href = '#';
    prevLink.textContent = 'Назад';
    const nextLink = document.createElement('a');
    nextLink.className = 'nav-link';
    nextLink.href = '#';
    nextLink.textContent = 'Вперед';
    const img = document.createElement('img');
    img.alt = '';
    content.appendChild(prevLink);
    content.appendChild(img);
    content.appendChild(nextLink);
    frame.appendChild(content);
    const caption = document.createElement('div');
    caption.className = 'photo-caption';
    const title = document.createElement('div');
    title.className = 'title';
    const desc = document.createElement('div');
    desc.className = 'description';
    caption.appendChild(title);
    caption.appendChild(desc);
    frame.appendChild(caption);
    container.appendChild(frame);
    let index = 0;
    function render() {
      const photo = images[index];
      img.src = photo.path;
      img.alt = photo.title;
      counter.textContent = `Фотографія ${index + 1} з ${images.length}`;
      title.textContent = photo.title;
      desc.textContent = photo.description;
      prevLink.style.visibility = index === 0 ? 'hidden' : 'visible';
      nextLink.style.visibility = index === images.length - 1 ? 'hidden' : 'visible';
    }
    prevLink.addEventListener('click', e => {
      e.preventDefault();
      if (index > 0) {
        index--;
        render();
      }
    });
    nextLink.addEventListener('click', e => {
      e.preventDefault();
      if (index < images.length - 1) {
        index++;
        render();
      }
    });
    render();
  }
  document.addEventListener('DOMContentLoaded', () => {
    initPhotoRotator('rotator', imagesArray);
  });
})();