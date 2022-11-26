
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
  <meta property="og:image" content="<?php echo $config["url"]; ?>/assets/img/social.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="600">

  <link rel="shortcut icon" type="image/png" href="<?php echo $config["url"]; ?>/assets/img/favicon.png">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="/assets/css/dark.css">
  <link rel="stylesheet" href="/assets/css/animate.min.css">
  <link rel="stylesheet" href="/assets/css/styles.css">

</head>

<body>

  <header id="header" class="container">
    <div class="title">
      <img id="logo" class="logo" src="/assets/img/logo.webp">
      <div id="head_content"></div>
      <hr>
      <div id="menu_content"></div>
    </div>
  </header>

  <div id="main" class="container">
    <article id="page_content"></article>
  </div>

  <div id="footer" class="footer animate__animated animate__fadeIn animate__faster animate__delay-1s">
    Made by <a href="https://recycledrobot.co.uk">Recycled Robot</a> with a keyboard<br>
  </div>

  <script>
    const github_username = '<?php echo $config["github_username"]; ?>';
  </script>
  <script src="/assets/js/marked.min.js"></script>
  <script src="/assets/js/scripts.js"></script>
</body>

</html>
