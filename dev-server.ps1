# dev-server.ps1
# -------------------------------------------------------------------
# Startet einen winzigen lokalen Webserver, um die App zu testen –
# inklusive Offline-Funktion (die braucht eine echte http://-Adresse).
# Du brauchst dafür KEIN Python und KEIN Node, nur Windows-Bordmittel.
#
# So startest du ihn:
#   1. Rechtsklick auf diese Datei  ->  "Mit PowerShell ausführen"
#      ODER in PowerShell im Projektordner:  .\dev-server.ps1
#   2. Browser öffnen:  http://localhost:8123
#   3. Zum Beenden im Fenster  Strg + C  drücken.

$root = $PSScriptRoot
if (-not $root) { $root = (Get-Location).Path }

$prefix = "http://localhost:8123/"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
$listener.Start()
Write-Host ""
Write-Host "  Lern-App laeuft auf $prefix" -ForegroundColor Green
Write-Host "  Im Browser oeffnen und zum Beenden hier Strg+C druecken."
Write-Host ""

$mime = @{
  ".html" = "text/html; charset=utf-8"
  ".js"   = "text/javascript; charset=utf-8"
  ".css"  = "text/css; charset=utf-8"
  ".json" = "application/json; charset=utf-8"
  ".webmanifest" = "application/manifest+json; charset=utf-8"
  ".png"  = "image/png"
  ".svg"  = "image/svg+xml"
  ".ico"  = "image/x-icon"
}

while ($listener.IsListening) {
  try {
    $ctx = $listener.GetContext()
    $path = [System.Uri]::UnescapeDataString($ctx.Request.Url.LocalPath)
    if ($path -eq "/") { $path = "/index.html" }
    $file = Join-Path $root ($path.TrimStart("/") -replace "/", "\")
    if (Test-Path $file -PathType Leaf) {
      $ext = [System.IO.Path]::GetExtension($file).ToLower()
      $ct = $mime[$ext]; if (-not $ct) { $ct = "application/octet-stream" }
      $bytes = [System.IO.File]::ReadAllBytes($file)
      $ctx.Response.ContentType = $ct
      $ctx.Response.ContentLength64 = $bytes.Length
      $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $ctx.Response.StatusCode = 404
      $msg = [System.Text.Encoding]::UTF8.GetBytes("Nicht gefunden: $path")
      $ctx.Response.OutputStream.Write($msg, 0, $msg.Length)
    }
    $ctx.Response.Close()
  } catch {
    # Beim Beenden kann eine Ausnahme auftreten - einfach ignorieren.
  }
}
