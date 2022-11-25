const url_params = new URLSearchParams(window.location.search);
const menu_content = document.getElementById('menu_content');
const page_content = document.getElementById('page_content');
const header = document.getElementById('header');
const main = document.getElementById('main');
const footer = document.getElementById('footer');

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

get_data(`https://raw.githubusercontent.com/impshum/blurg/main/${page}`, json = false)
  .then((res) => {
    let node = document.createElement('div');
    node.innerHTML = marked.parse(res);
    page_content.appendChild(node);
  });

get_data('https://api.github.com/repos/impshum/blurg/contents/contents')
  .then((res) => {
    for (var i = 0; i < res.length; i++) {
      console.log(res);
      let node = document.createElement('a');
      let page_title = res[i].name.replace('.md', '');
      node.href = '/?p=' + page_title;
      node.textContent = page_title.charAt(2).toUpperCase() + page_title.substr(3).toLowerCase();
      menu_content.appendChild(node);
    }
  });

const links = document.getElementsByTagName('a');
for (var i = 0; i < links.length; i++) {
  links[i].onclick = (e) => {
    e.preventDefault();
    console.log(e);
    let elements = [header, main, footer];
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.remove('animate__fadeIn');
      elements[i].classList.remove('animate__fadeInDown');
      elements[i].classList.add('animate__fadeOut');
    }
  }
}
