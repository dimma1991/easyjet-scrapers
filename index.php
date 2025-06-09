<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
require_once 'scraper/easyjetScraper.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $origin = $input['origin'] ?? '';
    $destination = $input['destination'] ?? '';
    $date = $input['date'] ?? '';

    $result = scrapeEasyJetPrice($origin, $destination, $date);
    echo json_encode($result);
} else {
    echo json_encode(['error' => 'Invalid request']);
}
?>
