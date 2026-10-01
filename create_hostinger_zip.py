import os
import zipfile

deploy_dir = r"c:\laragon\www\ROCKETDRIVE-Integrated Automotive Sales & After-Sales Management System\ROCKETDRIVE_Hostinger_Deploy"
zip_path = r"c:\laragon\www\ROCKETDRIVE-Integrated Automotive Sales & After-Sales Management System\ROCKETDRIVE_UPLOAD_HOSTINGER.zip"

if os.path.exists(zip_path):
    os.remove(zip_path)

file_count = 0
with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in sorted(os.walk(deploy_dir)):
        for file in sorted(files):
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, deploy_dir)
            arcname = rel_path.replace('\\', '/')
            zipf.write(full_path, arcname)
            file_count += 1
            print(f"Added: {arcname}")

print(f"\nSuccessfully created {zip_path} with {file_count} files using Linux forward slashes.")
