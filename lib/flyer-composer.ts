/**
 * Servicio para componer flyers personalizados usando Canvas HTML5
 * Monta la foto del usuario directamente en el template
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
            // Cargar las imágenes directamente
            const templateImg = await this.loadImage('/flyer-template-hack-cis.png');
            const userImg = await this.loadImage(userPhoto);

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

            // Configurar dimensiones y posición para la foto del usuario
            const photoX = 306;
            const photoY = 640;
            const photoWidth = 770 - 306; // 464px
            const photoHeight = 1085 - 640; // 445px

            // Calcular aspect ratio para mantener proporciones (cover)
            const targetAspect = photoWidth / photoHeight;
            const imageAspect = userImg.width / userImg.height;

            let drawWidth = photoWidth;
            let drawHeight = photoHeight;
            let drawX = photoX;
            let drawY = photoY;

            if (imageAspect > targetAspect) {
                // Imagen más ancha - ajustar por altura
                drawWidth = photoHeight * imageAspect;
                drawX = photoX - (drawWidth - photoWidth) / 2;
            } else {
                // Imagen más alta - ajustar por ancho
                drawHeight = photoWidth / imageAspect;
                drawY = photoY - (drawHeight - photoHeight) / 2;
            }

            // Recortar el área para que no se salga del espacio designado
            ctx.save();
            ctx.beginPath();
            ctx.rect(photoX, photoY, photoWidth, photoHeight);
            ctx.clip();

            // Dibujar la foto del usuario
            ctx.drawImage(userImg, drawX, drawY, drawWidth, drawHeight);

            ctx.restore();

            this.logOperation('Foto integrada', {
                photoX,
                photoY,
                photoWidth,
                photoHeight,
                imageAspect: imageAspect.toFixed(2),
                targetAspect: targetAspect.toFixed(2)
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
            method: 'Canvas HTML5'
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
