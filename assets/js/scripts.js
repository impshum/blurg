const github_username = 'impshum';

const url_params = new URLSearchParams(window.location.search);
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

if (!sessionStorage.getItem('hits')) {
  sessionStorage.setItem('hits', 1);
  head_content.parentNode.parentNode.classList.add('animate__animated', 'animate__fadeInDown');
} else {
  sessionStorage.setItem('hits', parseInt(sessionStorage.getItem('hits')) + 1);
}

if (!sessionStorage.getItem('pages')) {
  sessionStorage.setItem('pages', JSON.stringify([]));
}

let pages_storage = JSON.parse(sessionStorage.getItem('pages'));
let head_content_storage = sessionStorage.getItem('head_content');

if (sessionStorage.getItem('head_content')) {
  console.log('head_content from ls');
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

get_data(`https://raw.githubusercontent.com/${github_username}/blurg/main/${page}`, false)
  .then((res) => {
    let node = document.createElement('div');
    node.innerHTML = marked.parse(res);
    page_content.appendChild(node);
    page_content.parentNode.style.display = 'block'
    page_content.parentNode.classList.add('animate__animated', 'animate__fadeIn');
    sessionStorage.setItem(page, JSON.stringify(res.substr(3)));
  });

let node = document.createElement('a');
node.href = `/`;
node.innerHTML = `<img class='home' src='/assets/img/home.png'>`;
menu_content.appendChild(node);

if (sessionStorage.getItem('menu_content')) {
  console.log('menu_content from ls');
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
