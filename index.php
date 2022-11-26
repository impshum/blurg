
<?php
$config = require __DIR__ . "/config.php";
?>
<!doctype html>

<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title><?php echo $config["title"]; ?></title>
  <meta name="description" content="<?php echo $config["description"]; ?>">

  <meta name="theme-color" content="#202b39">
  <meta name="robots" content="index, nofollow">

  <meta property="og:title" content="<?php echo $config["title"]; ?>">
  <meta property="og:type" content="website">
  <meta property="og:url" content="<?php echo $config["url"]; ?>">
  <meta property="og:description" content="<?php echo $config["description"]; ?>">
  <meta property="og:image" content="<?php echo $config["url"]; ?>/core/img/social.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="600">

  <link rel="shortcut icon" type="image/png" href="<?php echo $config["url"]; ?>/core/img/favicon.png">

  <?php
  $theme = $config["theme"];
  echo "<link rel='stylesheet' href='/core/css/$theme.css'>";

  $menu_link_colors = [
    "light" => "#0a0a0a",
    "dark" => "#ffffff",
    "auto" => "inherit"
  ];

  $menu_link_color = $menu_link_colors[$config["theme"]];

  echo "<style>.title a:hover {color: $menu_link_color !important;}</style>";
  ?>

  <link rel="stylesheet" href="/core/css/animate.min.css">
  <link rel="stylesheet" href="/core/css/styles.css">

</head>

<body>

  <header id="header" class="container">
    <div class="title">
      <?php
      $logos = [
        "light" => "logo.webp",
        "dark" => "logo.webp",
        "auto" => "logo.webp"
      ];
      $logo = $logos[$config["theme"]];
      echo "<img id='logo' class='logo' src='/core/img/logo.png'>";
      ?>
      <div id="head_content"></div>
      <hr>
      <div id="menu_content">
        <a href="/"><img class='home' src='/core/img/home.png'></a>
      </div>
    </div>
    <div id="clear_session_data"></div>
  </header>

  <div id="main" class="container">
    <article id="page_content"></article>
    <button id="edit_button">Edit page</button>
  </div>

  <div id="footer" class="footer animate__animated animate__fadeIn animate__faster animate__delay-1s">
    Made by <a href="https://recycledrobot.co.uk">Recycled Robot</a> with a keyboard<br>
  </div>

  <script>
    let github_username = '<?php echo $config["github_username"]; ?>';
  </script>
  <script src="/core/js/marked.min.js"></script>
  <script src="/core/js/scripts.js"></script>
</body>

</html>
