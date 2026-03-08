<?php
// process_booking.php - Handles the form submission
require_once 'config.php';

// Create uploads folder if it doesn't exist
$uploadDir = 'uploads/';
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

// Handle file upload
$receiptPath = '';
if (isset($_FILES['receipt']) && $_FILES['receipt']['error'] === 0) {
    $file = $_FILES['receipt'];
    $fileName = uniqid('receipt_') . '.' . pathinfo($file['name'], PATHINFO_EXTENSION);
    $destination = $uploadDir . $fileName;
    
    if (move_uploaded_file($file['tmp_name'], $destination)) {
        $receiptPath = $destination;
    }
}

// Get form data
$refNumber = $_POST['refNumber'] ?? '';
$date = $_POST['date'] ?? '';
$time = $_POST['time'] ?? '';
$doctor = $_POST['doctor'] ?? '';
$patientName = $_POST['patientName'] ?? '';
$patientEmail = $_POST['patientEmail'] ?? '';
$patientPhone = $_POST['patientPhone'] ?? '';
$paymentMethod = $_POST['paymentMethod'] ?? '';

// Save to database
try {
    $pdo->beginTransaction();

    // Insert appointment
    $stmt = $pdo->prepare("INSERT INTO appointments 
        (reference_number, appointment_date, appointment_time, doctor_name, 
         patient_name, patient_email, patient_phone, payment_method, receipt_path) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$refNumber, $date, $time, $doctor, $patientName, 
                    $patientEmail, $patientPhone, $paymentMethod, $receiptPath]);

    // Lock the date
    $stmt2 = $pdo->prepare("INSERT INTO locked_dates (locked_date) VALUES (?)");
    $stmt2->execute([$date]);

    $pdo->commit();
    
    // Show success page
    echo "<!DOCTYPE html>
    <html>
    <head>
        <title>Booking Successful</title>
        <link rel='stylesheet' href='style.css'>
    </head>
    <body>
        <div style='max-width: 600px; margin: 100px auto; text-align: center; padding: 2rem; background: white; border-radius: 12px;'>
            <h1 style='color: #4CAF50;'>✅ Booking Successful!</h1>
            <p>Your reference number: <strong>$refNumber</strong></p>
            <p>Appointment: $date at $time with $doctor</p>
            <p>Receipt uploaded successfully.</p>
            <a href='index.html' class='btn btn-primary' style='margin-top: 1rem;'>Book Another</a>
        </div>
    </body>
    </html>";

} catch (Exception $e) {
    $pdo->rollBack();
    echo "Booking failed: " . $e->getMessage();
}
?>