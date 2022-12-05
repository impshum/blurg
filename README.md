# Blurg

A website with editable content using markdown files stored on Github. Pages and partials are stored in the browser session storage for speed and to reduce the amount of calls to the Github API.

* * *

### Screenshot

![](ss.jpg)

* * *

### Install Instructions

1.  Fork the Blurg repository from Github: <https://github.com/impshum/blurg>
2.  Change the description and website of your forked repo to your website title and url (more info below).
3.  Edit the php config file with your details (`/config.php`).
4.  Edit the json config file with your details (`/config.json`).
5.  Download the source code of your fork and upload to your server.
6.  Edit the partials in `/contents/partials/`.
7.  Edit/create the pages `/contents/`.
8.  Start pushing to your repository.

* * *

### PHP Config File

-   Config file is located in `/config.php`.


    "github_username" => "impshum",
    "preview_password" => "123"

* * *

### JSON Config File

-   Config file is located in `/config.json`.


    "url": "https://blurg.recycledrobot.co.uk",
    "title": "Blurg",
    "description": "A Beautiful Long Description",
    "short_description": "Something",
    "theme": "dark",
    "maintenance_mode": false,
    "show_house": true,
    "show_coffee": true,
    "show_ads": true

* * *

### Markdown & Image Files

-   These files are used to edit the pages, partials and to manage the images.
-   Put all images to be used in pages in the `/contents/images/` directory.

```
├── contents
│├── images
││└── thing.jpg
│├── partials
││├── blurgs.md
││├── coffee.md
││├── header.md
││├── index.md
││└── menu.md
│├── one.md
│├── two.md
│├── three.md
│└── four.md
```

* * *

### Why Change The Description & Url?

If you check out <https://blurg.recycledrobot.co.uk/?p=blurgs> you can find other users websites made with Blurg. Work in progress...
