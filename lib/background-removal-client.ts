/**
 * Wrapper client-side only para @imgly/background-removal
 * Este archivo garantiza que la librería solo se cargue en el navegador
 */

let backgroundRemovalModule: any = null;

export async function removeBackgroundClient(imageFile: File) {
  if (typeof window === 'undefined') {
    throw new Error('Esta funcionalidad solo está disponible en el navegador');
  }

  if (!backgroundRemovalModule) {
    backgroundRemovalModule = await import('@imgly/background-removal');
  }

  const { removeBackground } = backgroundRemovalModule;
  
  return await removeBackground(imageFile, {
    model: 'isnet',
    output: {
      format: 'image/png',
      quality: 0.9
    }
  });
}
