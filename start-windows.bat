@echo off
cd /d "%~dp0"

call :run_site
if %errorlevel%==0 goto :end

echo Python 3 was not found.

where winget >nul 2>nul
if %errorlevel%==0 (
    echo Installing Python 3 with winget...
    winget install --id Python.Python.3 --source winget --accept-package-agreements --accept-source-agreements
    call :run_site
    if %errorlevel%==0 goto :end
) else (
    echo winget was not found, so automatic installation is not available.
    echo Opening the official Python download page. Install Python 3, then run this file again.
    start "" "https://www.python.org/downloads/windows/"
)

echo Python 3 is still not available.
pause
goto :end

:run_site
where py >nul 2>nul
if %errorlevel%==0 (
    py -3 --version >nul 2>nul
    if %errorlevel%==0 (
        py -3 serve.py
        exit /b 0
    )
)

where python >nul 2>nul
if %errorlevel%==0 (
    python serve.py
    exit /b 0
)

exit /b 1

:end
