@echo off
REM =========================================
REM MANUAL INTERACTIVO HPV III - JUNAEB 2025
REM VERSION PORTABLE - UN SOLO CLICK
REM =========================================

echo.
echo ======================================
echo  MANUAL INTERACTIVO HPV III - JUNAEB
echo ======================================
echo.
echo Iniciando Manual HPV III...
echo.

REM Obtener la ruta completa del archivo HTML
set "HTML_FILE=%~dp0index.html"

REM Intentar abrir con Chrome primero (más compatible)
if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" (
    echo Abriendo con Google Chrome...
    start "Manual HPV III" "%ProgramFiles%\Google\Chrome\Application\chrome.exe" --allow-file-access-from-files --disable-web-security --user-data-dir="%TEMP%\chrome_dev_session" "file:///%HTML_FILE%"
    goto :success
)

REM Intentar con Chrome (x86)
if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" (
    echo Abriendo con Google Chrome...
    start "Manual HPV III" "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" --allow-file-access-from-files --disable-web-security --user-data-dir="%TEMP%\chrome_dev_session" "file:///%HTML_FILE%"
    goto :success
)

REM Intentar con Microsoft Edge
if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" (
    echo Abriendo con Microsoft Edge...
    start "Manual HPV III" "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" --allow-file-access-from-files --disable-web-security --user-data-dir="%TEMP%\edge_dev_session" "file:///%HTML_FILE%"
    goto :success
)

REM Si Edge está en Program Files
if exist "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" (
    echo Abriendo con Microsoft Edge...
    start "Manual HPV III" "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" --allow-file-access-from-files --disable-web-security --user-data-dir="%TEMP%\edge_dev_session" "file:///%HTML_FILE%"
    goto :success
)

REM Intentar con Firefox
if exist "%ProgramFiles%\Mozilla Firefox\firefox.exe" (
    echo Abriendo con Mozilla Firefox...
    start "Manual HPV III" "%ProgramFiles%\Mozilla Firefox\firefox.exe" "file:///%HTML_FILE%"
    goto :success
)

REM Intentar con Firefox (x86)
if exist "%ProgramFiles(x86)%\Mozilla Firefox\firefox.exe" (
    echo Abriendo con Mozilla Firefox...
    start "Manual HPV III" "%ProgramFiles(x86)%\Mozilla Firefox\firefox.exe" "file:///%HTML_FILE%"
    goto :success
)

REM Como último recurso, usar el navegador predeterminado
echo No se encontraron navegadores especificos. Usando navegador predeterminado...
start "Manual HPV III" "file:///%HTML_FILE%"

:success
echo.
echo ¡Manual HPV III abierto exitosamente!
echo.
echo INSTRUCCIONES:
echo - El manual se ha abierto en tu navegador
echo - Funciona completamente OFFLINE (sin internet)
echo - Tu progreso se guarda automaticamente durante la sesion
echo - Al completar el quiz obtendras retroalimentacion personalizada
echo.
echo Para cerrar este manual, simplemente cierra la pestana del navegador.
echo.
echo Presiona cualquier tecla para continuar...
pause >nul

REM Mantener la ventana abierta por si hay problemas
:end