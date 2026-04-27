<?php
/**
 * DOCI Trockenbau - Kontaktformular Backend
 * Empfängt POST-Requests vom Kontaktformular und schickt eine Mail
 * an info@doci-trockenbau.de.
 */

declare(strict_types=1);

header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: https://doci-trockenbau.de");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("X-Content-Type-Options: nosniff");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["success" => false, "error" => "Methode nicht erlaubt."]);
    exit;
}

$raw = file_get_contents("php://input");
if ($raw === false || $raw === "") {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Leere Anfrage."]);
    exit;
}

$input = json_decode($raw, true);
if (!is_array($input)) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Ungültiges JSON."]);
    exit;
}

$honeypot = trim((string)($input["website"] ?? ""));
if ($honeypot !== "") {
    echo json_encode(["success" => true]);
    exit;
}

$name    = trim((string)($input["name"] ?? ""));
$email   = trim((string)($input["email"] ?? ""));
$phone   = trim((string)($input["phone"] ?? ""));
$message = trim((string)($input["message"] ?? ""));

if ($name === "" || $email === "" || $message === "") {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Pflichtfelder fehlen."]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Ungültige E-Mail-Adresse."]);
    exit;
}

if (
    strlen($name) > 100 ||
    strlen($email) > 254 ||
    strlen($phone) > 50 ||
    strlen($message) > 5000
) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Eingaben zu lang."]);
    exit;
}

foreach ([$name, $email, $phone] as $field) {
    if (preg_match('/[\r\n]/', $field) === 1) {
        http_response_code(400);
        echo json_encode(["success" => false, "error" => "Ungültige Zeichen."]);
        exit;
    }
}

$to      = "info@doci-trockenbau.de";
$subject = "=?UTF-8?B?" . base64_encode("Kontaktanfrage von $name") . "?=";

$bodyLines = [
    "Neue Nachricht über das Kontaktformular von doci-trockenbau.de",
    "",
    "Name:    $name",
    "E-Mail:  $email",
];
if ($phone !== "") {
    $bodyLines[] = "Telefon: $phone";
}
$bodyLines[] = "";
$bodyLines[] = "Nachricht:";
$bodyLines[] = $message;
$bodyLines[] = "";
$bodyLines[] = "---";
$bodyLines[] = "Eingegangen: " . date("Y-m-d H:i:s");
$bodyLines[] = "IP: " . ($_SERVER["REMOTE_ADDR"] ?? "unbekannt");

$body = implode("\r\n", $bodyLines);

$fromAddress = "info@doci-trockenbau.de";
$headers = implode("\r\n", [
    "From: DOCI Website <$fromAddress>",
    "Reply-To: " . sprintf('%s <%s>', $name, $email),
    "Content-Type: text/plain; charset=UTF-8",
    "MIME-Version: 1.0",
    "X-Mailer: DOCI/contact.php",
]);

$ok = mail($to, $subject, $body, $headers, "-f$fromAddress");

if (!$ok) {
    http_response_code(500);
    error_log("contact.php: mail() failed for $email");
    echo json_encode(["success" => false, "error" => "Versand fehlgeschlagen. Bitte später erneut versuchen."]);
    exit;
}

echo json_encode(["success" => true]);
