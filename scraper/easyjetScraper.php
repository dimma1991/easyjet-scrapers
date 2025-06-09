<?php

function scrapeEasyJetPrice($origin, $destination, $date) {
    $cmd = "/usr/bin/node scraper_node.js " . escapeshellarg($origin) . " " . escapeshellarg($destination) . " " . escapeshellarg($date);
    $output = shell_exec($cmd . " 2>&1");

    // ლოგავ კონტეინერში ფაილში
    file_put_contents("debug_output.txt", $output);
    file_put_contents("debug_output.txt", shell_exec("which node"));
    if ($output === null) {
        return ["error" => "shell_exec returned null"];
    }

    return json_decode($output, true);
}

?>
