# Blurg

A website with editable content using markdown files stored on Github. Pages and partials are stored in the browser session storage for speed and to reduce calls to Github API.

* * *

### Screenshot

![](ss.jpg)

* * *

### Install Instructions

1.  Fork the Blurg repository from Github: <https://github.com/impshum/blurg>
2.  Edit the config file with your details (`/config.php`).
3.  Downlaod the source code of your fork and upload to your server.
4.  Edit the partials (`/partials/header.md` and `/partials/index.md`).
5.  Start pushing to your repository.

* * *

### Config File

-   Config file is located in `/config.php`.
-   It's a PHP array so be careful when editing. Please follow the example below using exactly the same syntax.

```
"url" => "<http://localhost:8888">,
"title" => "Blurg",
"description" => "A website with editable content using markdown files stored on Github",
"github_username" => "impshum"
```

* * *

### Markdown & Page Image Files

-   These files are used to edit the pages and partials.
-   Index is the home page `/partials/index.md`.
-   Put all images to be used in pages in the `/images/` directory.

```
├── contents
│   ├── 1-one.md
│   ├── 2-two.md
│   └── 3-three.md
├── images
│   └── thing.jpg
├── partials
│   ├── header.md
│   └── index.md
```

* * *

### Site Image Files

- These files are for the logo, favicon, home and social share images. Edit `favicon.png`, `social.jpg` and `logo.webp` to your liking.

```
├── assets
│   ├── img
│   │   ├── favicon.png
│   │   ├── home.webp
│   │   ├── logo.webp
│   │   └── social.jpg
```
