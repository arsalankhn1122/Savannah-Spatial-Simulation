param([string]$InputJson, [string]$OutputBase)
$ErrorActionPreference='Stop'
Add-Type -AssemblyName System.Drawing
$data=Get-Content -Raw -LiteralPath $InputJson | ConvertFrom-Json
$bitmap=New-Object Drawing.Bitmap 1654,2339
$bitmap.SetResolution(200,200)
$g=[Drawing.Graphics]::FromImage($bitmap)
$g.Clear([Drawing.Color]::White)
$g.TextRenderingHint=[Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$g.SmoothingMode=[Drawing.Drawing2D.SmoothingMode]::AntiAlias
$ink=New-Object Drawing.SolidBrush ([Drawing.Color]::FromArgb(30,42,36))
$green=New-Object Drawing.SolidBrush ([Drawing.Color]::FromArgb(52,100,72))
$light=New-Object Drawing.SolidBrush ([Drawing.Color]::FromArgb(111,119,114))
$title=New-Object Drawing.Font('Arial',52,[Drawing.FontStyle]::Bold,[Drawing.GraphicsUnit]::Pixel)
$sub=New-Object Drawing.Font('Arial',25,[Drawing.FontStyle]::Regular,[Drawing.GraphicsUnit]::Pixel)
$head=New-Object Drawing.Font('Arial',32,[Drawing.FontStyle]::Bold,[Drawing.GraphicsUnit]::Pixel)
$body=New-Object Drawing.Font('Arial',29,[Drawing.FontStyle]::Regular,[Drawing.GraphicsUnit]::Pixel)
$g.FillRectangle($green,115,105,72,9)
$g.DrawString('SPATIAL SIMULATION / ASSIGNMENT 2',$sub,$light,115,136)
$g.DrawString($data.title,$title,$ink,110,192)
$g.DrawString('African Savannah with AI | 29 October 2026',$sub,$light,115,268)
$y=346
foreach($section in $data.sections){
  $g.DrawString($section.heading,$head,$green,115,$y)
  $y+=48
  $size=$g.MeasureString([string]$section.text,$body,1424)
  $box=New-Object Drawing.RectangleF 115,$y,1424,([single]($size.Height+6))
  $g.DrawString([string]$section.text,$body,$ink,$box)
  $y+=[int][Math]::Ceiling($size.Height)+39
}
if($y -gt 2190){throw "Report overflows one page: $y"}
$g.DrawLine((New-Object Drawing.Pen ([Drawing.Color]::FromArgb(210,218,212))),115,2220,1539,2220)
$g.DrawString('Specification included above. AI log, comparison and run evidence supplied separately.',$sub,$light,115,2240)
$g.DrawString('1 / 1',$sub,$light,1470,2280)
$bitmap.Save("$OutputBase.png",[Drawing.Imaging.ImageFormat]::Png)
$bitmap.Save("$OutputBase.jpg",[Drawing.Imaging.ImageFormat]::Jpeg)
$g.Dispose(); $bitmap.Dispose()
Write-Output "Report rendered on one A4 page; content ends at pixel $y."
