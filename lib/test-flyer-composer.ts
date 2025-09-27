/**
 * Archivo de prueba para el FlyerComposerService
 * Solo para desarrollo - eliminar en producción
 */

import { FlyerComposerService } from './flyer-composer';

// Función de prueba que se puede llamar desde la consola del navegador
(window as any).testFlyerComposer = {
  generateTestFlyer: async (file: File, name: string = 'TEST USER') => {
    try {
      console.log('🧪 Iniciando prueba del compositor de flyers con IA...');
      console.log('⏳ Eliminando fondo con IA (esto puede tomar unos segundos)...');
      
      const result = await FlyerComposerService.generatePersonalizedFlyer(file, name);
      console.log('✅ Flyer generado:', result);
      
      // Mostrar en una nueva ventana para inspección
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head><title>Test Flyer - AI Background Removal (1080x1920)</title></head>
            <body style="margin: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 100vh; background: #000; color: white; font-family: Arial;">
              <h2>🎨 Flyer Vertical Generado con IA</h2>
              <img src="${result}" style="max-width: 50vw; max-height: 80vh; object-fit: contain; border: 2px solid #8B5CF6; border-radius: 10px;" />
              <p style="margin-top: 20px; opacity: 0.7;">Formato: 1080x1920 | Fondo eliminado con IA</p>
              <p style="opacity: 0.5;">Foto: (306,640) - (770,1085) | Nombre: Y=1152px</p>
            </body>
          </html>
        `);
      }
      
      return result;
    } catch (error) {
      console.error('❌ Error en prueba:', error);
      throw error;
    }
  },
  
  getStats: () => {
    return FlyerComposerService.getUsageStats();
  },
  
  // Función para probar solo la eliminación de fondo
  testBackgroundRemoval: async (file: File) => {
    try {
      console.log('🧪 Probando solo eliminación de fondo...');
      // Acceder al método privado para pruebas
      const service = FlyerComposerService as any;
      const result = await service.removeBackgroundWithAI(file);
      
      const url = URL.createObjectURL(result);
      console.log('✅ Fondo eliminado:', url);
      
      // Mostrar resultado
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head><title>Test Background Removal</title></head>
            <body style="margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: linear-gradient(45deg, #ff0000, #00ff00); background-size: 20px 20px;">
              <img src="${url}" style="max-width: 90vw; max-height: 90vh; object-fit: contain;" />
            </body>
          </html>
        `);
      }
      
      return url;
    } catch (error) {
      console.error('❌ Error en eliminación de fondo:', error);
      throw error;
    }
  }
};

console.log('🧪 AI Test utilities loaded:');
console.log('- testFlyerComposer.generateTestFlyer(file, name)');
console.log('- testFlyerComposer.testBackgroundRemoval(file)');
console.log('- testFlyerComposer.getStats()');