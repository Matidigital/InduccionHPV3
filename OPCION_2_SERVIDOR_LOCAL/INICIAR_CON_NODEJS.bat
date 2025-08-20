@echo off
REM =========================================
REM MANUAL INTERACTIVO HPV III - JUNAEB 2025
REM VERSION NODE.JS SERVER - ALTERNATIVA
REM =========================================

echo.
echo ==========================================
echo  MANUAL INTERACTIVO HPV III - JUNAEB
echo  VERSION SERVIDOR NODE.JS
echo ==========================================
echo.

REM Cambiar al directorio del script
cd /d "%~dp0"

echo Verificando Node.js...
echo.

REM Verificar si Node.js está instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    goto :no_nodejs
)

echo ✅ Node.js encontrado!
echo.
echo Iniciando servidor especializado para Manual HPV III...
echo.

REM Ejecutar servidor Node.js
node servidor_simple.js

goto :end

:no_nodejs
cls
echo.
echo ==========================================
echo  NODE.JS NO ENCONTRADO
echo ==========================================
echo.
echo Para usar esta version alternativa necesitas Node.js.
echo.
echo OPCIONES DISPONIBLES:
echo.
echo 1. USAR VERSION PYTHON (Recomendado):
echo    - Haz doble-click en "INICIAR_SERVIDOR_HPV3.bat"
echo.
echo 2. USAR VERSION PORTABLE (Más fácil):
echo    - Ve a la carpeta "OPCION_1_PORTABLE"
echo    - Haz doble-click en "ABRIR_MANUAL_HPV3.bat"
echo.
echo 3. INSTALAR NODE.JS:
echo    - Ve a https://nodejs.org
echo    - Descarga la version LTS
echo    - Instala y reinicia este archivo
echo.
echo Presiona cualquier tecla para salir...
pause >nul

:end
echo.
echo ¡Servidor Node.js detenido!
echo ¡Gracias por usar el Manual HPV III!
pause