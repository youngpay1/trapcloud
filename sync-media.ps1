$ffmpeg = "C:\Users\peima\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin\ffmpeg.exe"
$archiveBase = "c:\Users\peima\Documents\AI\Trapcloud\website\Media\Archive"
$publicBase   = "c:\Users\peima\Documents\AI\Trapcloud\website\public\shows"
$compressMB   = 15

$folderMap = [ordered]@{
    "Lancey Foux\Berlin"         = "lancey-berlin"
    "Lancey Foux\brussels"       = "lancey-brussels"
    "Lancey Foux\Cologne"        = "lancey-cologne"
    "Slimesito\Berlin"           = "slimesito\berlin"
    "Slimesito\Cologne"          = "slimesito\cologne"
    "Slimesito\Frankfurt"        = "slimesito\frankfurt"
    "Slimesito\Moscow"           = "slimesito\moscow"
    "Slimesito\Riga"             = "slimesito\riga"
    "Slimesito\Saint Petersburg" = "slimesito\saint-petersburg"
    "Slimesito\Warsaw"           = "slimesito\warsaw"
    "Travis Scott\Frankfurt"     = "travis-scott"
}

$videoExts = @('.mp4','.mov','.avi','.mts','.flv','.wmv','.mkv')
$imageExts = @('.jpg','.jpeg','.png','.webp')
$tifExts   = @('.tif','.tiff')

# Sort files numerically by basename (1, 2, 3... beats 1, 10, 2 alphabetically)
function Sort-Numeric($files) {
    $files | Sort-Object {
        $n = $_.BaseName -replace '[^\d]', ''
        if ($n -match '^\d+$') { [int]$n } else { [int]::MaxValue }
    }, Name
}

# Build the shows.ts data from what was actually synced
$showsData = [ordered]@{}

foreach ($archRel in $folderMap.Keys) {
    $pubRel  = $folderMap[$archRel]
    $archDir = Join-Path $archiveBase $archRel
    $pubDir  = Join-Path $publicBase  $pubRel

    if (-not (Test-Path $archDir)) { Write-Host "SKIP (missing): $archDir"; continue }
    New-Item -ItemType Directory -Force $pubDir | Out-Null
    Get-ChildItem $pubDir -File | Remove-Item -Force

    $allFiles = Get-ChildItem $archDir -File
    $videos   = Sort-Numeric ($allFiles | Where-Object { $videoExts -contains $_.Extension.ToLower() })
    $images   = Sort-Numeric ($allFiles | Where-Object { $imageExts -contains $_.Extension.ToLower() })
    $tifs     = Sort-Numeric ($allFiles | Where-Object { $tifExts   -contains $_.Extension.ToLower() })

    $vi = 1; $pi = 1
    $videoRefs = @(); $imageRefs = @()
    $pubUrlBase = "/shows/$($pubRel.Replace('\','/'))"

    foreach ($f in $videos) {
        $ext    = $f.Extension.ToLower()
        $sizeMB = $f.Length / 1MB
        $dest   = Join-Path $pubDir "video-$vi.mp4"
        if ($sizeMB -gt $compressMB -or $ext -ne '.mp4') {
            Write-Host "COMPRESS  [$([math]::Round($sizeMB,0))MB -> video-$vi.mp4]  $($f.Name)"
            & $ffmpeg -i $f.FullName -vf "scale='min(1280,iw)':-2" -c:v libx264 -crf 30 -preset fast -an -movflags +faststart $dest -y 2>&1 | Out-Null
        } else {
            Write-Host "COPY      [$([math]::Round($sizeMB,1))MB -> video-$vi.mp4]  $($f.Name)"
            Copy-Item $f.FullName $dest
        }
        $videoRefs += "$pubUrlBase/video-$vi.mp4"
        $vi++
    }

    foreach ($f in $images) {
        $sizeMB = $f.Length / 1MB
        $dest   = Join-Path $pubDir "photo-$pi.jpg"
        Write-Host "COPY      [$([math]::Round($sizeMB,1))MB -> photo-$pi.jpg]  $($f.Name)"
        Copy-Item $f.FullName $dest
        $imageRefs += "$pubUrlBase/photo-$pi.jpg"
        $pi++
    }

    foreach ($f in $tifs) {
        $sizeMB = $f.Length / 1MB
        $dest   = Join-Path $pubDir "photo-$pi.jpg"
        Write-Host "CONVERT   [$([math]::Round($sizeMB,0))MB -> photo-$pi.jpg]  $($f.Name)"
        & $ffmpeg -i $f.FullName -q:v 2 $dest -y 2>&1 | Out-Null
        $imageRefs += "$pubUrlBase/photo-$pi.jpg"
        $pi++
    }

    $showsData[$pubRel] = @{ videos = $videoRefs; images = $imageRefs }
    Write-Host "DONE: $archRel  ($($vi-1) videos, $($pi-1) photos)"
}

Write-Host "`nSync complete. Updating shows.ts..."

$d = [char]0x2014  # em dash

$showsMeta = [ordered]@{
    "travis-scott"               = @{ id="travis-scott-frankfurt";      name="Travis Scott $d Frankfurt";       year="2023"; city="Frankfurt";        venue="Zoom Club" }
    "lancey-berlin"              = @{ id="lancey-foux-berlin";          name="Lancey Foux $d Berlin";           year="2023"; city="Berlin";          venue="Soho House Berlin" }
    "lancey-brussels"            = @{ id="lancey-foux-brussels";        name="Lancey Foux $d Brussels";         year="2023"; city="Brussels";         venue="Loft" }
    "lancey-cologne"             = @{ id="lancey-foux-cologne";         name="Lancey Foux $d Cologne";          year="2023"; city="Cologne";          venue="Masquare" }
    "slimesito\berlin"           = @{ id="slimesito-berlin";            name="Slimesito $d Berlin";             year="2023"; city="Berlin";          venue="Panke Culture" }
    "slimesito\cologne"          = @{ id="slimesito-cologne";           name="Slimesito $d Cologne";            year="2023"; city="Cologne";          venue="Veedel Club" }
    "slimesito\frankfurt"        = @{ id="slimesito-frankfurt";         name="Slimesito $d Frankfurt";          year="2023"; city="Frankfurt";        venue="Dough House" }
    "slimesito\moscow"           = @{ id="slimesito-moscow";            name="Slimesito $d Moscow";             year="2023"; city="Moscow";           venue="" }
    "slimesito\riga"             = @{ id="slimesito-riga";              name="Slimesito $d Riga";               year="2023"; city="Riga";             venue="" }
    "slimesito\saint-petersburg" = @{ id="slimesito-saint-petersburg";  name="Slimesito $d Saint Petersburg";  year="2023"; city="Saint Petersburg"; venue="" }
    "slimesito\warsaw"           = @{ id="slimesito-warsaw";            name="Slimesito $d Warsaw";             year="2023"; city="Warsaw";           venue="" }
}

$ts = @'
export interface Show {
  id: string;
  date: string;
  artist: string;
  city: string;
  venue: string;
  ticketUrl?: string;
  status: 'upcoming' | 'soldout' | 'cancelled';
}

export interface PastShow {
  id: string;
  name: string;
  year: string;
  city: string;
  venue: string;
  images?: string[];
  videos?: string[];
}

export const upcomingShows: Show[] = [
  // Add upcoming shows here when confirmed
];

export const pastShows: PastShow[] = [
'@

foreach ($pubRel in $showsMeta.Keys) {
    $meta = $showsMeta[$pubRel]
    $data = $showsData[$pubRel]
    if (-not $data) { continue }

    $ts += "  {`n"
    $ts += "    id: '$($meta.id)',`n"
    $ts += "    name: '$($meta.name)',`n"
    $ts += "    year: '$($meta.year)',`n"
    $ts += "    city: '$($meta.city)',`n"
    if ($meta.venue) { $ts += "    venue: '$($meta.venue)',`n" }

    if ($data.videos.Count -gt 0) {
        $ts += "    videos: [`n"
        foreach ($v in $data.videos) { $ts += "      '$v',`n" }
        $ts += "    ],`n"
    }
    if ($data.images.Count -gt 0) {
        $ts += "    images: [`n"
        foreach ($i in $data.images) { $ts += "      '$i',`n" }
        $ts += "    ],`n"
    }
    $ts += "  },`n"
}

$ts += "];`n"

$tsPath = "c:\Users\peima\Documents\AI\Trapcloud\website\src\data\shows.ts"
[System.IO.File]::WriteAllText($tsPath, $ts, [System.Text.UTF8Encoding]::new($false))
Write-Host "shows.ts updated."
