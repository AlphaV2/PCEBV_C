<?php
require_once "auth_session.php";
require_once "../config/db.php";

$db = new DB();
$conn = $db->connect();

$result = $conn->query("SELECT * FROM contact_messages ORDER BY created_at DESC");
?>
<!DOCTYPE html>
<html>
<head>
    <title>Contact Messages</title>
    <style>
        body { font-family: sans-serif; padding: 30px; background: #f8fafc; }
        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .msg-card { background: white; padding: 20px; margin-bottom: 15px; border-radius: 8px; border-left: 5px solid #2563eb; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
        .msg-meta { color: #64748b; font-size: 12px; margin-bottom: 5px; display: flex; justify-content: space-between; }
        .msg-body { color: #334155; line-height: 1.5; }
        .btn-back { padding: 8px 12px; background: #64748b; color: white; text-decoration: none; border-radius: 4px; font-size: 14px; }
        h1 { margin: 0; }
        .tag { background: #e2e8f0; padding: 2px 6px; border-radius: 4px; font-size: 11px; font-weight: bold; color: #475569; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Inbox (<?= $result->num_rows ?>)</h1>
        <a href="dashboard.php" class="btn-back">&larr; Back to Dashboard</a>
    </div>

    <?php if ($result->num_rows > 0): ?>
        <?php while($row = $result->fetch_assoc()): ?>
            <div class="msg-card">
                <div class="msg-meta">
                    <span>
                        <strong><?= htmlspecialchars($row['name']) ?></strong> 
                        (<?= htmlspecialchars($row['email']) ?>)
                        <?php if($row['phone']): ?> | 📞 <?= htmlspecialchars($row['phone']) ?> <?php endif; ?>
                    </span>
                    <span><?= date("M d, Y - h:i A", strtotime($row['created_at'])) ?></span>
                </div>
                <div style="margin: 10px 0;">
                    <span class="tag">Topic: <?= htmlspecialchars($row['enquiry'] ?? 'General') ?></span>
                </div>
                <div class="msg-body">
                    <?= nl2br(htmlspecialchars($row['message'])) ?>
                </div>
            </div>
        <?php endwhile; ?>
    <?php else: ?>
        <div style="text-align:center; margin-top:50px; color:#94a3b8;">
            <h2>No messages yet</h2>
            <p>Go to your website contact form and send a test message!</p>
        </div>
    <?php endif; ?>

</body>
</html>