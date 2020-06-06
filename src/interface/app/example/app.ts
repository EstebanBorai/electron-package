import './app.scss';

function showSample() {
  // Create a container
  const container = document.createElement('div');
  container.id = 'example';

  // Create text elements
  const title = document.createElement('h1');
  const subttitle = document.createElement('span');

  // Set content for text elements
  title.innerText = 'electron-package';
  subttitle.innerText = 'Electron Boilerplate';

  // Append to container
  container.appendChild(title);
  container.appendChild(subttitle);

  document.getElementById('root').appendChild(container);
}

export default showSample;
