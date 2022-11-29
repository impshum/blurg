const url_params = new URLSearchParams(window.location.search);
const logo = document.getElementById('logo');
const head_content = document.getElementById('head_content');
const menu_content = document.getElementById('menu_content');
const page_content = document.getElementById('page_content');
const clear_session_data = document.getElementById('clear_session_data');
const edit_button = document.getElementById('edit_button');

var converter = new showdown.Converter({metadata: true});

if (!page_content) {
  throw new Error("maintainence mode");
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

const get_blurgs = () => {
  window.setTimeout(() => {
    get_data(`https://api.github.com/repos/impshum/blurg/forks`, true)
      .then((res) => {
        let node = document.createElement('button');
        node.classList.add('flex', 'mt-1');
        node.textContent = 'impshum';
        node.setAttribute('data-url', 'https://blurg.recycledrobot.co.uk');
        page_content.appendChild(node);
        for (var i = 0; i < res.length; i++) {
          let node = document.createElement('button');
          node.setAttribute('data-url', res[i].homepage);
          node.classList.add('flex', 'animate__animated', 'animate__fadeIn');
          node.textContent = res[i].owner.login;
          page_content.appendChild(node);
        }
      }).then(() => {
        let blurg_buttons = document.querySelectorAll('button.flex');
        for (var i = 0; i < blurg_buttons.length; i++) {
          blurg_buttons[i].onclick = (e) => {
            console.log(e);
            window.open(e.target.getAttribute('data-url'), '_blank').focus();
          }
        }
      });
  }, 200);
}

if (clear_session_data) {
  clear_session_data.onclick = () => {
    sessionStorage.clear();
    window.location.reload();
  }
}

let p = url_params.get('p');
let page = 'contents/partials/index.md';

if (!p) {
  p = 'index';
  page = 'contents/partials/index.md';
} else if (p && p != 'blurgs') {
  page = `contents/${p}.md`;
} else if (p && p == 'blurgs') {
  page = `contents/partials/blurgs.md`;
  edit_button.remove();
  get_blurgs();
}

if (p != 'index' && p != 'blurg') {
  edit_button.onclick = (e) => {
    window.open(`https://github.com/${github_username}/blurg/edit/main/contents/${p}.md`, '_blank').focus();
  }
} else {
  if (edit_button) {
    edit_button.remove();
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
  node.innerHTML = converter.makeHtml(res);
  head_content.appendChild(node);
}

const add_menu_content = (res) => {
  for (var i = 0; i < res.length; i++) {
    if (res[i].name.endsWith('.md')) {
      let node = document.createElement('a');
      if (sessionStorage.getItem('hits') == 1) {
        node.classList.add('animate__animated', 'animate__fadeIn', 'animate__faster', `animate__delay-${i}00s`);
      }
      let page_title = res[i].name.replace('.md', '');
      if (url_params.get('preview')) {
        node.href = `/?preview=${url_params.get('preview')}&p=${page_title}`;
      } else {
        node.href = `/?p=${page_title}`;
      }
      node.textContent = page_title.charAt(2).toUpperCase() + page_title.substr(3).toLowerCase();
      menu_content.appendChild(node);
    }
  }
}

const add_page_content = (res) => {
  let node = document.createElement('div');
  node.innerHTML = converter.makeHtml(res);
  var metadata = converter.getMetadata(true);
  console.log(metadata);
  page_content.appendChild(node);
  page_content.parentNode.style.display = 'block'
  page_content.parentNode.classList.add('animate__animated', 'animate__fadeIn', 'animate__fast');
}

if (sessionStorage.getItem('head_content')) {
  var res = JSON.parse(sessionStorage.getItem('head_content'))
  add_head_content(res);
} else {
  get_data(`https://raw.githubusercontent.com/${github_username}/blurg/main/contents/partials/header.md`, false)
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
