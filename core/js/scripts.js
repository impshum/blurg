

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

if (!sessionStorage.getItem('hits')) {
  sessionStorage.setItem('hits', 1);
  head_content.parentNode.parentNode.classList.add('animate__animated', 'animate__fadeInDown');
  logo.classList.add('animate__animated', 'animate__fadeIn', 'animate__delay-05s');
} else {
  sessionStorage.setItem('hits', parseInt(sessionStorage.getItem('hits')) + 1);
}

const add_head_content = (res) => {
  let node = document.createElement('div');
  node.innerHTML = marked.parse(res);
  head_content.appendChild(node);
}

const add_menu_content = (res) => {
  for (var i = 0; i < res.length; i++) {
    let node = document.createElement('a');
    let page_title = res[i].name.replace('.md', '');
    node.href = `/${page_title}`;
    node.textContent = page_title.charAt(2).toUpperCase() + page_title.substr(3).toLowerCase();
    menu_content.appendChild(node);
  }
}

const add_page_content = (res) => {
  let node = document.createElement('div');
  node.innerHTML = marked.parse(res);
  page_content.appendChild(node);
  page_content.parentNode.style.display = 'block'
  page_content.parentNode.classList.add('animate__animated', 'animate__fadeIn', 'animate__fast');
}

if (sessionStorage.getItem('head_content')) {
  var res = JSON.parse(sessionStorage.getItem('head_content'))
  add_head_content(res);
} else {
  get_data(`https://raw.githubusercontent.com/${github_username}/blurg/main/partials/header.md`, false)
    .then((res) => {
      add_head_content(res);
      sessionStorage.setItem('head_content', JSON.stringify(res));
    });
}

if (sessionStorage.getItem(page)) {
  var res = JSON.parse(sessionStorage.getItem(page));
  add_page_content(res);
} else {
  get_data(`https://raw.githubusercontent.com/${github_username}/blurg/main/${page}`, false)
    .then((res) => {
      add_page_content(res);
      sessionStorage.setItem(page, JSON.stringify(res));
    });
}

if (sessionStorage.getItem('menu_content')) {
  var res = JSON.parse(sessionStorage.getItem('menu_content'));
  add_menu_content(res);
} else {
  get_data(`https://api.github.com/repos/${github_username}/blurg/contents/contents`)
    .then((res) => {
      add_menu_content(res);
      sessionStorage.setItem('menu_content', JSON.stringify(res));
    });

}
