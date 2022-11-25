const url_params = new URLSearchParams(window.location.search);
const page_content = document.getElementById('page_content')
const page = url_params.get('p');


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


const get_all_pages = () => {
  get_data('https://api.github.com/repos/impshum/blurg/contents/contents')
    .then((res) => {
      let file_names = [];
      for (var i = 0; i < res.length; i++) {
        console.log(res[i]);
        file_names.push(res[i].name)
      }
      console.log(file_names);
    });

}


get_data('https://raw.githubusercontent.com/impshum/blurg/main/contents/' + page + '.md', json = false)
   .then((res) => {
     let node = document.createElement('div');
     node.innerHTML = marked.parse(res);;
     page_content.appendChild(node);
   });
