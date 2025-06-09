<?php
function scrapeEasyJetPrice($origin, $destination, $date) {
    $command = escapeshellcmd("node scraper_node.js "$origin" "$destination" "$date"");
    $output = shell_exec($command);
    return json_decode($output, true);
}
?>
