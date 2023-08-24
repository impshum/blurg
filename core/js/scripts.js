const url_params = new URLSearchParams(window.location.search);
const logo = document.getElementById('logo');
const head_content = document.getElementById('head_content');
const menu_content = document.getElementById('menu_content');
const page_content = document.getElementById('page_content');
const coffee_content = document.getElementById('coffee_content');
const clear_session_data = document.getElementById('clear_session_data');
const edit_button = document.getElementById('edit_button');


showdown.extension('remove_p', function() {
  return [{
    type: 'listener',
    listeners: {
      'hashHTMLBlocks.after': function(event, text, converter, options, globals) {
        text = text.replace(/^ {0,3}<[a-z]+\b[^>]*>$/gmi, function(wm) {
          return '\n\n¨K' + (globals.gHtmlBlocks.push(wm) - 1) + 'K\n\n';
        });
        return text;
      }
    }
  }];
});

showdown.extension("remove-p-from-img", function() {
  return [{
    type: "output",
    filter: function(text) {
      text = text.replace(
        '/<p>((?:.(?!p>))*?)(<a[^>]*>)?\s*(<img[^>]+>)(<\/a>)?(.*?)<\/p>/is',
        ""
      );
      return text;
    },
  }, ];
});

var converter = new showdown.Converter({
  metadata: false,
  tables: true,
  extensions: ["remove-p-from-img"]
});

var converter_p = new showdown.Converter({
  extensions: ['remove_p']
});

converter.setFlavor('github');

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


const add_captions = () => {
  var elements = document.querySelectorAll("#page_content img");
  Array.prototype.forEach.call(elements, function(el, i) {
    const caption = document.createElement('figcaption');
    var node = document.createTextNode(el.getAttribute("title"));
    caption.appendChild(node);
    const wrapper = document.createElement('figure');
    wrapper.classList.add('image');
    if (el.getAttribute("alt") == 'half') {
      wrapper.classList.add('half');
    }
    if (el.getAttribute("alt") == 'third') {
      wrapper.classList.add('third');
    }
    el.parentNode.insertBefore(wrapper, el);
    el.parentNode.removeChild(el);
    wrapper.appendChild(el);
    if (el.getAttribute("title")) {
      wrapper.appendChild(caption);
    }
  });
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
  header.classList.add('animate__animated', 'animate__fadeInDown', 'animate__faster');
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
  let node = document.createElement('div');
  node.innerHTML = converter_p.makeHtml(res);
  menu_content.appendChild(node);
}

const add_coffee_content = (res) => {
  let node = document.createElement('div');
  node.innerHTML = converter.makeHtml(res);
  coffee_content.appendChild(node);
}

const add_page_content = (res) => {
  let node = document.createElement('div');
  node.innerHTML = converter.makeHtml(res);
  page_content.appendChild(node);
  page_content.parentNode.style.display = 'block'
  page_content.parentNode.classList.add('animate__animated', 'animate__fadeIn', 'animate__fast');

  let charts = document.getElementsByTagName('chart');
  for (let i = 0; i < charts.length; i++) {
    let chart_name = charts[i].getAttribute('name');
    let chart_width = charts[i].getAttribute('width');

    get_data(`https://raw.githubusercontent.com/${github_username}/blurg/main/embeds/${chart_name}.html`, false)
      .then((res) => {
        let chart_html = `<div class="iframe-container"><iframe src="about:blank" style="width: ${chart_width} !important;"></iframe></div>`;
        charts[i].innerHTML = chart_html;
        let chart_frame = charts[i].getElementsByTagName('iframe')[0];
        chart_frame.contentWindow.document.open();
        chart_frame.contentWindow.document.write(res);
        chart_frame.contentWindow.document.close();
      });
  }

  add_captions();
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

if (sessionStorage.getItem('menu_content')) {
  var res = JSON.parse(sessionStorage.getItem('menu_content'));
  add_menu_content(res);
} else {
  get_data(`https://raw.githubusercontent.com/${github_username}/blurg/main/contents/partials/menu.md`, false)
    .then((res) => {
      add_menu_content(res);
      sessionStorage.setItem('menu_content', JSON.stringify(res));
    });
}

if (sessionStorage.getItem('coffee_content')) {
  var res = JSON.parse(sessionStorage.getItem('coffee_content'))
  add_coffee_content(res);
} else {
  get_data(`https://raw.githubusercontent.com/${github_username}/blurg/main/contents/partials/coffee.md`, false)
    .then((res) => {
      add_coffee_content(res)
      sessionStorage.setItem('coffee_content', JSON.stringify(res));
    });
}

if (sessionStorage.getItem(page)) {
  var res = JSON.parse(sessionStorage.getItem(page));
  add_page_content(res)
} else {
  get_data(`https://raw.githubusercontent.com/${github_username}/blurg/main/${page}`, false)
    .then((res) => {
      add_page_content(res)

      sessionStorage.setItem(page, JSON.stringify(res));
    });
}
