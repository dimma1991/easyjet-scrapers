<?php

function scrapeEasyJetPrice($origin, $destination, $date) {
    $cmd = "node scraper_node.js " . escapeshellarg($origin) . " " . escapeshellarg($destination) . " " . escapeshellarg($date);
    
    $output = shell_exec($cmd);

    if ($output === null) {
        return ["error" => "shell_exec returned null — probably Node or Puppeteer is not installed or failed"];
    }

    return json_decode($output, true);
}

?>
