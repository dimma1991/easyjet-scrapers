<?php

function scrapeEasyJetPrice($origin, $destination, $date) {
    $cmd = "node scraper_node.js " . escapeshellarg($origin) . " " . escapeshellarg($destination) . " " . escapeshellarg($date);
    $output = shell_exec($cmd);
    return json_decode($output, true);
}

?>
