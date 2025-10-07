import { removeBackgroundClient } from './background-removal-client';

/**
 * Servicio para componer flyers personalizados usando Canvas HTML5
 * Elimina el background de la foto del usuario usando IA y la integra con el template
 */
export class FlyerComposerService {
    private static requestCount = 0;

    /**
     * Logger para operaciones del compositor
     */
    private static logOperation(action: string, details?: any) {
        this.requestCount++;
        const timestamp = new Date().toISOString();
        console.log(`🎨 [Flyer Composer #${this.requestCount}] ${timestamp} - ${action}`);
        if (details) {
            console.log('📋 Detalles:', details);
        }
    }



    /**
     * Carga una imagen desde una URL o File
     */
    private static loadImage(source: string | File): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';

            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error('Error al cargar la imagen'));

            if (typeof source === 'string') {
                img.src = source;
            } else {
                img.src = URL.createObjectURL(source);
            }
        });
    }

    /**
     * Elimina el background de una imagen usando IA avanzada
     */
    private static async removeBackgroundWithAI(imageFile: File): Promise<Blob> {
        this.logOperation('Iniciando eliminación de fondo con IA');

        try {
            const result = await removeBackgroundClient(imageFile);

            this.logOperation('Fondo eliminado exitosamente', {
                originalSize: imageFile.size,
                resultSize: result.size
            });

            return result;
        } catch (error) {
            this.logOperation('Error eliminando fondo', { error });
            throw new Error('No se pudo eliminar el fondo de la imagen');
        }
    }

    /**
     * Genera el flyer personalizado
     */
    static async generatePersonalizedFlyer(
        userPhoto: File,
        participantName: string = ''
    ): Promise<string> {
        if (typeof window === 'undefined') {
            throw new Error('Esta funcionalidad solo está disponible en el navegador');
        }

        this.logOperation('Iniciando generación de flyer personalizado', {
            participantName,
            photoSize: userPhoto.size,
            photoType: userPhoto.type
        });

        try {
            const userPhotoNoBackground = await this.removeBackgroundWithAI(userPhoto);
            const templateImg = await this.loadImage('/flyer-template-hack-cis.jpg');

            const userPhotoFile = new File([userPhotoNoBackground], 'processed-photo.png', {
                type: 'image/png'
            });
            const userImg = await this.loadImage(userPhotoFile);

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            if (!ctx) {
                throw new Error('No se pudo crear el contexto del canvas');
            }

            canvas.width = 1080;
            canvas.height = 1920;

            this.logOperation('Canvas creado', {
                width: canvas.width,
                height: canvas.height
            });

            ctx.drawImage(templateImg, 0, 0, canvas.width, canvas.height);

            const photoX = 306;
            const photoY = 640;
            const photoWidth = 770 - 306;
            const photoHeight = 1085 - 640;

            ctx.drawImage(userImg, photoX, photoY, photoWidth, photoHeight);

            this.logOperation('Foto integrada', {
                photoX,
                photoY,
                photoWidth,
                photoHeight
            });

            if (participantName.trim()) {
                const nameY = 1152;
                const nameX = canvas.width / 2;

                ctx.fillStyle = '#1a1a1a';
                ctx.font = 'bold 48px Arial, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                ctx.fillText(participantName.toUpperCase(), nameX, nameY);

                this.logOperation('Nombre agregado', {
                    participantName,
                    nameX,
                    nameY,
                    fontSize: '48px',
                    color: '#1a1a1a'
                });
            }

            return new Promise((resolve, reject) => {
                canvas.toBlob((blob) => {
                    if (blob) {
                        const url = URL.createObjectURL(blob);
                        this.logOperation('Flyer generado exitosamente', {
                            blobSize: blob.size
                        });
                        resolve(url);
                    } else {
                        reject(new Error('No se pudo generar el blob de la imagen'));
                    }
                }, 'image/png', 0.95);
            });

        } catch (error) {
            this.logOperation('Error generando flyer', {
                error: error instanceof Error ? error.message : 'Error desconocido'
            });
            throw error;
        }
    }

    /**
     * Descargar la imagen generada
     */
    static async downloadFlyer(imageUrl: string, fileName: string = 'hack-cis-flyer.png'): Promise<void> {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            this.logOperation('Flyer descargado', { fileName });
        } catch (error) {
            console.error('Error descargando flyer:', error);
            throw new Error('No se pudo descargar el flyer');
        }
    }

    /**
     * Obtener estadísticas de uso
     */
    static getUsageStats() {
        return {
            totalRequests: this.requestCount,
            isConfigured: true,
            method: 'Canvas HTML5 + AI Background Removal'
        };
    }

    /**
     * Resetear contador de operaciones
     */
    static resetStats() {
        this.requestCount = 0;
        console.log('📊 Estadísticas de uso reseteadas');
    }
}
