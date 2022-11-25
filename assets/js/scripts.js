const github_username = 'impshum';

const url_params = new URLSearchParams(window.location.search);
const head_content = document.getElementById('head_content');
const menu_content = document.getElementById('menu_content');
const page_content = document.getElementById('page_content');

let page = url_params.get('p');

if (!page) {
  page = 'partials/index.md';
} else {
  page = `contents/${page}.md`;
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

get_data(`https://raw.githubusercontent.com/${github_username}/blurg/main/partials/header.md`, false)
  .then((res) => {
    let node = document.createElement('div');
    node.innerHTML = marked.parse(res);
    head_content.appendChild(node);
  });

get_data(`https://raw.githubusercontent.com/${github_username}/blurg/main/${page}`, false)
  .then((res) => {
    let node = document.createElement('div');
    node.innerHTML = marked.parse(res);
    page_content.appendChild(node);
  });

let node = document.createElement('a');
node.href = `/`;
node.innerHTML = `<img class='home' src='/assets/img/home.png'>`;
menu_content.appendChild(node);

get_data(`https://api.github.com/repos/${github_username}/blurg/contents/contents`)
  .then((res) => {
    for (var i = 0; i < res.length; i++) {
      let node = document.createElement('a');
      let page_title = res[i].name.replace('.md', '');
      node.href = `/?p=${page_title}`;
      node.textContent = page_title.charAt(2).toUpperCase() + page_title.substr(3).toLowerCase();
      menu_content.appendChild(node);
    }
  });
