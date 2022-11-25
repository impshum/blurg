const page_content = document.getElementById('page_content')

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

get_data('https://api.github.com/repos/impshum/blurg/contents/contents')
  .then((res) => {
    let file_names = [];
    for (var i = 0; i < res.length; i++) {
      file_names.push(res[i].name)
    }
    for (var i = 0; i < file_names.length; i++) {
      get_data('https://raw.githubusercontent.com/impshum/blurg/main/contents/' + file_names[i], json = false)
        .then((res) => {
          console.log(res);
          let node = document.createElement('div');
          node.innerHTML = marked.parse(res);;
          page_content.appendChild(node);
        });
    }

  });
