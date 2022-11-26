const github_username = 'impshum';

const url_params = new URLSearchParams(window.location.search);
const logo = document.getElementById('logo');
const head_content = document.getElementById('head_content');
const menu_content = document.getElementById('menu_content');
const page_content = document.getElementById('page_content');

let p = url_params.get('p');
let page = 'partials/index.md';

if (p) {
  page = `contents/${p}.md`;
}

const get_data = async (url, json = true) => {
  try {
    const req = await fetch(url, {
      method: 'GET'
    });
    if (json) {
      return await req.json();
    }
    return await req.text();
  } catch (err) {
    console.error(`ERROR: ${err}`);
  }
}

const insert_head_content = (data) => {
  let node = document.createElement('div');
  node.innerHTML = marked.parse(data);
  head_content.appendChild(node);
}

let node = document.createElement('a');
node.href = `/`;
node.innerHTML = `<img class='home' src='/assets/img/home.webp'>`;
menu_content.appendChild(node);

if (!sessionStorage.getItem('hits')) {
  sessionStorage.setItem('hits', 1);
  head_content.parentNode.parentNode.classList.add('animate__animated', 'animate__fadeInDown');
  logo.classList.add('animate__animated', 'animate__fadeIn', 'animate__delay-05s');
} else {
  sessionStorage.setItem('hits', parseInt(sessionStorage.getItem('hits')) + 1);
}

let pages_storage = JSON.parse(sessionStorage.getItem('pages'));
let head_content_storage = sessionStorage.getItem('head_content');

if (sessionStorage.getItem('head_content')) {
  insert_head_content(JSON.parse(sessionStorage.getItem('head_content')));
} else {
  get_data(`https://raw.githubusercontent.com/${github_username}/blurg/main/partials/header.md`, false)
    .then((res) => {
      let node = document.createElement('div');
      node.innerHTML = marked.parse(res);
      head_content.appendChild(node);
      sessionStorage.setItem('head_content', JSON.stringify(res));
    });
}

if (sessionStorage.getItem(page)) {
  var res = JSON.parse(sessionStorage.getItem(page));
  let node = document.createElement('div');
  node.innerHTML = marked.parse(res);
  page_content.appendChild(node);
  page_content.parentNode.style.display = 'block'
  page_content.parentNode.classList.add('animate__animated', 'animate__fadeIn', 'animate__fast');
} else {
  get_data(`https://raw.githubusercontent.com/${github_username}/blurg/main/${page}`, false)
    .then((res) => {
      let node = document.createElement('div');
      node.innerHTML = marked.parse(res);
      page_content.appendChild(node);
      page_content.parentNode.style.display = 'block'
      page_content.parentNode.classList.add('animate__animated', 'animate__fadeIn', 'animate__fast');
      sessionStorage.setItem(page, JSON.stringify(res));
    });
}

if (sessionStorage.getItem('menu_content')) {
  var res = JSON.parse(sessionStorage.getItem('menu_content'));

  for (var i = 0; i < res.length; i++) {
    let node = document.createElement('a');
    let page_title = res[i].name.replace('.md', '');
    node.href = `/?p=${page_title}`;
    node.textContent = page_title.charAt(2).toUpperCase() + page_title.substr(3).toLowerCase();
    menu_content.appendChild(node);
  }
} else {
  get_data(`https://api.github.com/repos/${github_username}/blurg/contents/contents`)
    .then((res) => {
      for (var i = 0; i < res.length; i++) {
        let node = document.createElement('a');
        let page_title = res[i].name.replace('.md', '');
        node.href = `/?p=${page_title}`;
        node.textContent = page_title.charAt(2).toUpperCase() + page_title.substr(3).toLowerCase();
        menu_content.appendChild(node);
      }
      sessionStorage.setItem('menu_content', JSON.stringify(res));
    });

}
