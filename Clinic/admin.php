<?php
// admin.php - View all bookings
require_once 'config.php';

// Fetch all appointments
$stmt = $pdo->query("SELECT * FROM appointments ORDER BY booked_at DESC");
$appointments = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html>
<head>
    <title>Admin - View Bookings</title>
    <link rel="stylesheet" href="style.css">
    <style>
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { padding: 10px; border: 1px solid #ddd; text-align: left; }
        th { background: #667eea; color: white; }
        img { max-width: 100px; }
        .container { padding: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>All Appointments</h1>
        <table>
            <tr>
                <th>Ref #</th>
                <th>Date/Time</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Payment</th>
                <th>Receipt</th>
            </tr>
            <?php foreach ($appointments as $app): ?>
            <tr>
                <td><?= $app['reference_number'] ?></td>
                <td><?= $app['appointment_date'] ?> <?= $app['appointment_time'] ?></td>
                <td><?= $app['patient_name'] ?><br><small><?= $app['patient_email'] ?></small></td>
                <td><?= $app['doctor_name'] ?></td>
                <td><?= $app['payment_method'] ?></td>
                <td>
                    <?php if ($app['receipt_path']): ?>
                        <a href="<?= $app['receipt_path'] ?>" target="_blank">View Receipt</a>
                    <?php endif; ?>
                </td>
            </tr>
            <?php endforeach; ?>
        </table>
        <p><a href="index.html">← Back to Booking</a></p>
    </div>
</body>
</html>