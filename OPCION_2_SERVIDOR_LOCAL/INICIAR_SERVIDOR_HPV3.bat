@echo off
REM =========================================
REM MANUAL INTERACTIVO HPV III - JUNAEB 2025
REM VERSION SERVIDOR LOCAL - ULTRA FÁCIL
REM =========================================

echo.
echo ==========================================
echo  MANUAL INTERACTIVO HPV III - JUNAEB
echo  VERSION SERVIDOR WEB LOCAL
echo ==========================================
echo.

REM Cambiar al directorio del script
cd /d "%~dp0"

echo Preparando servidor local para Manual HPV III...
echo.

REM Buscar Python en ubicaciones comunes
set "PYTHON_CMD="

REM Python 3.x desde Microsoft Store
if exist "%USERPROFILE%\AppData\Local\Microsoft\WindowsApps\python.exe" (
    set "PYTHON_CMD=%USERPROFILE%\AppData\Local\Microsoft\WindowsApps\python.exe"
    echo Python encontrado: Microsoft Store version
    goto :found_python
)

REM Python instalado globalmente
python --version >nul 2>&1
if %errorlevel% equ 0 (
    set "PYTHON_CMD=python"
    echo Python encontrado: instalacion global
    goto :found_python
)

REM Python 3 específico
python3 --version >nul 2>&1
if %errorlevel% equ 0 (
    set "PYTHON_CMD=python3"
    echo Python 3 encontrado: instalacion global
    goto :found_python
)

REM Python en Program Files
if exist "%ProgramFiles%\Python*\python.exe" (
    for /d %%i in ("%ProgramFiles%\Python*") do (
        set "PYTHON_CMD=%%i\python.exe"
        echo Python encontrado en: %%i
        goto :found_python
    )
)

REM Python en Program Files (x86)
if exist "%ProgramFiles(x86)%\Python*\python.exe" (
    for /d %%i in ("%ProgramFiles(x86)%\Python*") do (
        set "PYTHON_CMD=%%i\python.exe"
        echo Python encontrado en: %%i
        goto :found_python
    )
)

REM Si no se encontró Python, mostrar instrucciones de instalación
goto :no_python

:found_python
echo.
echo ============================================
echo  ¡SERVIDOR INICIANDOSE!
echo ============================================
echo.
echo El servidor web se está iniciando...
echo En unos segundos se abrirá el manual en tu navegador
echo.
echo IMPORTANTE:
echo - El manual se abrira automaticamente en http://localhost:8000
echo - Mantén esta ventana ABIERTA mientras uses el manual
echo - Para CERRAR el servidor, presiona Ctrl + C aquí
echo.

REM Iniciar servidor HTTP con Python
echo Iniciando servidor HTTP en puerto 8000...
echo.

REM Crear archivo temporal para abrir navegador después de que inicie el servidor
echo timeout /t 3 >nul > temp_open_browser.bat
echo start "Manual HPV III" http://localhost:8000 >> temp_open_browser.bat
start /min cmd /c temp_open_browser.bat

REM Iniciar servidor Python HTTP
"%PYTHON_CMD%" -m http.server 8000

goto :end

:no_python
cls
echo.
echo ==========================================
echo  ¡PYTHON NO ENCONTRADO!
echo ==========================================
echo.
echo Para usar esta version necesitas Python instalado.
echo.
echo OPCIONES RAPIDAS:
echo.
echo 1. OPCION MAS FACIL: 
echo    - Ve a la carpeta "OPCION_1_PORTABLE" 
echo    - Haz doble-click en "ABRIR_MANUAL_HPV3.bat"
echo    - ¡No necesita Python!
echo.
echo 2. INSTALAR PYTHON RAPIDAMENTE:
echo    - Ve a https://www.python.org/downloads/
echo    - Descarga Python 3.x
echo    - Durante la instalacion, marca "Add Python to PATH"
echo    - Reinicia este archivo .bat
echo.
echo 3. INSTALAR DESDE MICROSOFT STORE:
echo    - Abre Microsoft Store
echo    - Busca "Python 3.x"
echo    - Instala y reinicia este archivo .bat
echo.
echo Presiona cualquier tecla para salir...
pause >nul
goto :end

:end
REM Limpiar archivos temporales
if exist temp_open_browser.bat del temp_open_browser.bat
echo.
echo Servidor detenido. ¡Gracias por usar el Manual HPV III!
pause