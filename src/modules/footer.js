import gitHubLogo from '../assets/logo-github.svg'

export default function createFooter() {
  const content = document.getElementById('content');

  const footer = document.createElement('footer');
  content.appendChild(footer);

  const websiteInfo = document.createElement('div');
  websiteInfo.classList.add('creator-info');
  websiteInfo.innerHTML = `<h6><strong>Made by </strong></h6>
                            <a href="https://github.com/RaulUrdanetaG" target="_blank"><img src="${gitHubLogo}" alt="Github logo"></a>
                            <h6><a href="https://github.com/RaulUrdanetaG" target="_blank"><strong>Raul Urdaneta</strong></a></h6>`;
  footer.appendChild(websiteInfo);
}
