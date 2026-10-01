<?php
$deployDir = __DIR__ . DIRECTORY_SEPARATOR . 'ROCKETDRIVE_Hostinger_Deploy';
$zipPath   = __DIR__ . DIRECTORY_SEPARATOR . 'ROCKETDRIVE_UPLOAD_HOSTINGER.zip';

if (file_exists($zipPath)) {
    unlink($zipPath);
}

$zip = new ZipArchive();
if ($zip->open($zipPath, ZipArchive::CREATE | ZipArchive::OVERWRITE) !== true) {
    die("Error opening zip file: $zipPath\n");
}

$iterator = new RecursiveIteratorIterator(
    new RecursiveDirectoryIterator($deployDir, RecursiveDirectoryIterator::SKIP_DOTS),
    RecursiveIteratorIterator::SELF_FIRST
);

$fileCount = 0;
foreach ($iterator as $item) {
    $fullPath = $item->getPathname();
    $relPath  = substr($fullPath, strlen($deployDir) + 1);
    // Force standard forward slash for Linux compatibility
    $entryName = str_replace('\\', '/', $relPath);

    if ($item->isDir()) {
        $zip->addEmptyDir($entryName);
    } else {
        $zip->addFile($fullPath, $entryName);
        $fileCount++;
    }
}

$zip->close();
echo "Successfully created $zipPath with $fileCount files.\n";
