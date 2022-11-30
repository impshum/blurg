
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
  <meta property="og:image" content="<?php echo $config["url"]; ?>/contents/images/social.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="600">

  <link rel="shortcut icon" type="image/png" href="<?php echo $config["url"]; ?>/contents/images/favicon.png">

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

  <?php if (!$config["maintenance_mode"] || isset($_GET["preview"]) && $_GET["preview"] == $config["preview_password"]) { ?>
    <header id="header" class="container">
      <div class="title">
        <img id='logo' class='logo' src='/contents/images/logo.png'>
        <div id="head_content"></div>
        <hr>
        <div id="menu_content">
          <?php if (isset($_GET["preview"])) { ?>
            <a href="/?preview=<?php echo $_GET["preview"]; ?>"><img class='home' src='/core/img/home.webp'></a>
          <?php  } else { ?>
            <a href="/"><img class='home' src='/core/img/home.png'></a>
          <?php  } ?>
        </div>
      </div>
      <div id="clear_session_data"></div>
      <a href="/?p=blurgs" id="show_blurgs"></a>
    </header>

    <div id="main" class="container">
      <article id="page_content"></article>
      <button id="edit_button" class="animate__animated animate__fadeIn animate__delay-1s">Edit page</button>
    </div>

    <?php if ($config["show_ads"]) { ?>
      <div id="ads" class="container animate__animated animate__fadeIn animate__delay-1s">
        <img class="ad" src="/contents/images/ad.jpg">
      </div>
    <?php  } ?>

    <div id="footer" class="footer animate__animated animate__fadeIn animate__faster animate__delay-1s">
      Made by <a href="https://recycledrobot.co.uk">Recycled Robot</a> with a keyboard<br>
    </div>
  <?php } else { ?>
    <article class="is-centered"><br><br><br>
      <h1 class="is-centered">Coming soon</h1><br>
      <img src='/core/img/logo.png'>
    </article>
  <?php } ?>

  <script>
    let github_username = '<?php echo $config["github_username"]; ?>';
  </script>

  <script src="core/js/showdown.min.js"></script>
  <script src="/core/js/scripts.js"></script>
</body>

</html>
