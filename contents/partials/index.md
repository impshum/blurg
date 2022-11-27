# Blurg

A website with editable content using markdown files stored on Github. Pages and partials are stored in the browser session storage for speed and to reduce the amount of calls to the Github API.

* * *

### Install Instructions

1.  Fork the Blurg repository from Github: <https://github.com/impshum/blurg>
2.  Edit the config file with your details (`/config.php`).
3.  Downlaod the source code of your fork and upload to your server.
4.  Edit the partials in `/contents/partials/header.md` and `/contents/partials/index.md`.
4.  Edit/create the pages `/contents/`.
5.  Start pushing to your repository.

* * *

### Config File

-   Config file is located in `/config.php`.
-   It's a PHP array so be careful when editing. Please follow the example below using exactly the same syntax.

```
"url" => "http://localhost:8888",
"title" => "Blurg",
"description" => "Blurg",
"theme" => "auto",
"github_username" => "impshum",
"maintenance_mode" => false,
"preview_password" => "123"
```

* * *

### Markdown & Image Files

-   These files are used to edit the pages, partials and to manage the images.
-   Index is the home page `/contents/partials/index.md`.
-   Put all images to be used in pages in the `/contents/images/` directory.

```
├── contents
│   ├── 1-one.md
│   ├── 2-two.md
│   ├── 3-three.md
│   ├── 4-four.md
│   ├── images
│   │   ├── favicon.png
│   │   ├── logo.png
│   │   ├── social.jpg
│   │   └── thing.jpg
│   └── partials
│       ├── blurgs.md
│       ├── header.md
│       └── index.md
```
