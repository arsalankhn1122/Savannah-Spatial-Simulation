param([string]$Plan, [string]$OutputDirectory)
$ErrorActionPreference = 'Stop'
$course = (Resolve-Path "$PSScriptRoot/../../..").Path
$scratch = Join-Path $course 'tmp/gama'
New-Item -ItemType Directory -Force $scratch | Out-Null
$arguments = @('-Xms256m', '-Xmx2g', '-Djava.awt.headless=true',
    '-Duse_global_preference_store=true', '-Denable_logging=true', '-Denable_debug=true',
    '--add-opens=java.base/java.lang=ALL-UNNAMED', '--add-opens=java.base/java.util=ALL-UNNAMED',
    '--add-opens=java.base/java.util.concurrent=ALL-UNNAMED',
    "-Dosgi.configuration.area=$scratch/configuration",
    '-Dosgi.sharedConfiguration.area=C:/Program Files/Gama/headless/configuration',
    '-Dosgi.configuration.cascaded=true',
    '-jar', 'C:/Program Files/Gama/plugins/org.eclipse.equinox.launcher_1.6.1000.v20250227-1734.jar',
    '-install', 'C:/Program Files/Gama', '-application', 'gama.headless.product',
    '-data', "$scratch/workspace", '-hpc', '1', (Resolve-Path $Plan).Path, $OutputDirectory)
& 'C:/Program Files/Gama/jdk/bin/java.exe' @arguments
if ($LASTEXITCODE -ne 0) { throw "GAMA failed: $LASTEXITCODE" }
