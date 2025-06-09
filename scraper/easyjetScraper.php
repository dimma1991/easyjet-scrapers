<?php

function scrapeEasyJetPrice($origin, $destination, $date) {
    $cmd = "/usr/local/bin/node scraper_node.js " . escapeshellarg($origin) . " " . escapeshellarg($destination) . " " . escapeshellarg($date);
    $output = shell_exec($cmd . " 2>&1");

    if ($output === null) {
        return ["error" => "shell_exec returned null — node not found"];
    }

    return json_decode($output, true);
}

?>
