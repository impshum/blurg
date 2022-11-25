const url_params = new URLSearchParams(window.location.search);
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

get_data(`https://raw.githubusercontent.com/impshum/blurg/main/${page}`, false)
  .then((res) => {
    let node = document.createElement('div');
    node.innerHTML = marked.parse(res);
    page_content.appendChild(node);
  });

get_data('https://api.github.com/repos/impshum/blurg/contents/contents')
  .then((res) => {
    for (var i = 0; i < res.length; i++) {
      let node = document.createElement('a');
      let page_title = res[i].name.replace('.md', '');
      node.href = `$${window.location.href.origin}/blurg/?p=${page_title}`;
      node.textContent = page_title.charAt(2).toUpperCase() + page_title.substr(3).toLowerCase();
      menu_content.appendChild(node);
    }
  });

console.log(window.location);
