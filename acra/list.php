<?php
$file = $_GET["file"];
$content = "<h2 style='margin: 30px; color: rgb(113, 89, 155);'>".$_GET["file"]."</h2>";
$content = $content."<div style='margin: 30px'>".file_get_contents( $file)."</div>";
echo $content;