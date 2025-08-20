@echo off
echo ============================================
echo    JARVIS - Ollama Manager
echo ============================================
echo.

REM Try common installation locations
if exist "C:\Users\%USERNAME%\AppData\Local\Programs\Ollama\ollama.exe" (
    set "OLLAMA_PATH=C:\Users\%USERNAME%\AppData\Local\Programs\Ollama"
    goto :found
)

if exist "C:\Program Files\Ollama\ollama.exe" (
    set "OLLAMA_PATH=C:\Program Files\Ollama"
    goto :found
)

if exist "C:\Program Files (x86)\Ollama\ollama.exe" (
    set "OLLAMA_PATH=C:\Program Files (x86)\Ollama"
    goto :found
)

echo Ollama not found in common locations. Please check installation.
echo Common locations:
echo - C:\Users\%USERNAME%\AppData\Local\Programs\Ollama
echo - C:\Program Files\Ollama
echo - C:\Program Files (x86)\Ollama
echo.
echo Download from: https://ollama.ai
pause
exit /b 1

:found
echo Found Ollama at: %OLLAMA_PATH%
set "PATH=%OLLAMA_PATH%;%PATH%"

echo.
echo Choose an option:
echo [1] Start Ollama service only
echo [2] Download small model then start service
echo.
set /p choice="Enter choice (1-2) or press Enter for option 1: "

if "%choice%"=="" set choice=1
if "%choice%"=="1" goto :start_service
if "%choice%"=="2" goto :download_model

echo Invalid choice. Starting service...
goto :start_service

:download_model
echo.
echo Available small models for JARVIS:
echo.
echo [1] phi3:mini        - 2.3GB (Microsoft, recommended)
echo [2] gemma:2b         - 1.4GB (Google, ultra small)  
echo [3] qwen2:1.5b       - 0.9GB (Alibaba, minimal)
echo.
echo Current JARVIS model: llama3:8b (4.7GB)
echo.

set /p model_choice="Choose model (1-3) or Enter for phi3:mini: "

if "%model_choice%"=="" set model=phi3:mini
if "%model_choice%"=="1" set model=phi3:mini
if "%model_choice%"=="2" set model=gemma:2b
if "%model_choice%"=="3" set model=qwen2:1.5b

if not defined model set model=phi3:mini

echo.
echo Downloading %model%...
echo This may take a few minutes...
echo.

ollama pull %model%

if %ERRORLEVEL% equ 0 (
    echo.
    echo SUCCESS! %model% downloaded
    echo.
    echo To use with JARVIS:
    echo 1. Start JARVIS: node jarvis-terminal.js
    echo 2. Run: ollama-use %model%
    echo.
) else (
    echo ERROR: Download failed
    echo Try starting Ollama service first
    echo.
)

:start_service
echo Starting Ollama service...
echo Press Ctrl+C to stop the service
echo.
ollama serve