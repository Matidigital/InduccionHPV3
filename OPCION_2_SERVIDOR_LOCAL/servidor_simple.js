#!/usr/bin/env node

/**
 * SERVIDOR WEB SIMPLE PARA MANUAL HPV III
 * JUNAEB 2025 - Version 2.0
 * 
 * Este servidor permite ejecutar el Manual HPV III
 * en un servidor web local para máxima compatibilidad
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;
const HOST = 'localhost';

// Tipos MIME para diferentes archivos
const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.pdf': 'application/pdf'
};

// Función para obtener tipo MIME
function getMimeType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    return mimeTypes[ext] || 'text/plain';
}

// Crear servidor HTTP
const server = http.createServer((req, res) => {
    let filePath = req.url === '/' ? '/index.html' : req.url;
    filePath = path.join(__dirname, filePath);
    
    // Prevenir acceso a archivos fuera del directorio
    const relativePath = path.relative(__dirname, filePath);
    if (relativePath.startsWith('..')) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('403 Forbidden');
        return;
    }
    
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(`
                    <!DOCTYPE html>
                    <html lang="es">
                    <head>
                        <meta charset="UTF-8">
                        <title>404 - Archivo no encontrado</title>
                        <style>
                            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                            h1 { color: #e74c3c; }
                            a { color: #3498db; text-decoration: none; }
                            a:hover { text-decoration: underline; }
                        </style>
                    </head>
                    <body>
                        <h1>404 - Archivo no encontrado</h1>
                        <p>El archivo solicitado no existe.</p>
                        <p><a href="/">← Volver al Manual HPV III</a></p>
                    </body>
                    </html>
                `);
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 Error interno del servidor');
            }
        } else {
            const mimeType = getMimeType(filePath);
            res.writeHead(200, { 
                'Content-Type': mimeType,
                'Cache-Control': 'no-cache'
            });
            res.end(content);
        }
    });
});

// Iniciar servidor
server.listen(PORT, HOST, () => {
    console.log('');
    console.log('================================================');
    console.log('    SERVIDOR MANUAL HPV III - JUNAEB 2025');
    console.log('================================================');
    console.log('');
    console.log(`✅ Servidor iniciado exitosamente!`);
    console.log(`🌐 URL: http://${HOST}:${PORT}`);
    console.log(`📂 Directorio: ${__dirname}`);
    console.log('');
    console.log('📋 INSTRUCCIONES:');
    console.log('• El manual se abrirá automáticamente en tu navegador');
    console.log('• Mantén esta ventana ABIERTA mientras uses el manual');
    console.log('• Para CERRAR el servidor: presiona Ctrl + C');
    console.log('');
    console.log('🎯 ¡Listo para usar el Manual Interactivo HPV III!');
    console.log('');
    
    // Intentar abrir navegador automáticamente
    const { exec } = require('child_process');
    const url = `http://${HOST}:${PORT}`;
    
    let command;
    switch (process.platform) {
        case 'win32':
            command = `start ${url}`;
            break;
        case 'darwin':
            command = `open ${url}`;
            break;
        case 'linux':
            command = `xdg-open ${url}`;
            break;
        default:
            console.log(`⚠️  Abre manualmente: ${url}`);
            return;
    }
    
    exec(command, (error) => {
        if (error) {
            console.log(`⚠️  Abre manualmente: ${url}`);
        } else {
            console.log('🚀 Navegador abierto automáticamente');
        }
    });
});

// Manejo de errores del servidor
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error('');
        console.error('❌ ERROR: El puerto 8000 ya está en uso');
        console.error('');
        console.error('SOLUCIONES:');
        console.error('1. Cierra otros servidores web locales');
        console.error('2. O abre directamente: http://localhost:8000');
        console.error('');
    } else {
        console.error('❌ Error del servidor:', err);
    }
    process.exit(1);
});

// Manejo de cierre del servidor
process.on('SIGINT', () => {
    console.log('');
    console.log('🛑 Cerrando servidor Manual HPV III...');
    console.log('');
    console.log('¡Gracias por usar el Manual Interactivo HPV III!');
    console.log('JUNAEB 2025 - Programa Habilidades para la Vida');
    console.log('');
    server.close(() => {
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    console.log('');
    console.log('🛑 Servidor terminado');
    server.close(() => {
        process.exit(0);
    });
});