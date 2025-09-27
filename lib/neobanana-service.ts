import { GoogleGenAI } from "@google/genai";

export class FlyerGeneratorService {
  private static readonly GEMINI_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY;
  private static requestCount = 0;

  /**
   * Logger para peticiones a Gemini
   */
  private static logRequest(action: string, details?: any) {
    this.requestCount++;
    const timestamp = new Date().toISOString();
    console.log(`🤖 [Gemini Request #${this.requestCount}] ${timestamp} - ${action}`);
    if (details) {
      console.log('📋 Detalles:', details);
    }
  }

  /**
   * Optimiza una imagen reduciendo su tamaño y calidad
   */
  static async optimizeImage(file: File, maxWidth: number = 1024, quality: number = 0.8): Promise<File> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Calcular nuevas dimensiones manteniendo proporción
        let { width, height } = img;

        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        // Dibujar imagen optimizada
        ctx?.drawImage(img, 0, 0, width, height);

        // Convertir a blob con calidad reducida
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const optimizedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              console.log(`📉 Imagen optimizada: ${file.size} → ${optimizedFile.size} bytes`);
              resolve(optimizedFile);
            } else {
              reject(new Error('No se pudo optimizar la imagen'));
            }
          },
          'image/jpeg',
          quality
        );
      };

      img.onerror = () => reject(new Error('Error al cargar la imagen'));
      img.src = URL.createObjectURL(file);
    });
  }

  /**
   * Convierte un File o Blob a base64
   */
  static async fileToBase64(file: File | Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  /**
   * Obtiene el template del flyer como base64
   */
  static async getFlyerTemplateAsBase64(templatePath: string = '/flyer-template-hack-cis.jpg'): Promise<string> {
    try {
      const response = await fetch(templatePath);
      if (!response.ok) {
        throw new Error(`No se pudo cargar el template: ${response.statusText}`);
      }

      const blob = await response.blob();
      return await this.fileToBase64(blob);
    } catch (error) {
      console.error('Error cargando template:', error);
      throw new Error('No se pudo cargar el template del flyer. Asegúrate de que el archivo flyer-template-hack-cis.jpg esté en la carpeta public/');
    }
  }

  /**
   * Sistema de backoff exponencial para reintentos
   */
  static async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Genera el flyer personalizado usando Gemini para fusionar las imágenes
   */
  static async generatePersonalizedFlyer(
    userPhoto: File,
    participantName: string = ''
  ): Promise<string> {
    // Verificar si la API key está configurada
    if (!this.GEMINI_API_KEY) {
      throw new Error('⚠️ Google Generative AI API key no configurada. Por favor configura tu API key en las variables de entorno.');
    }

    console.log('🚀 Iniciando generación de flyer personalizado...');

    const maxRetries = 3;
    let attempt = 0;

    while (attempt < maxRetries) {
      attempt++;
      console.log(`📡 Intento ${attempt}/${maxRetries}...`);

      try {
        // Paso 1: Optimizar imagen del usuario
        console.log('Paso 1: Optimizando imagen...');
        const optimizedPhoto = await this.optimizeImage(userPhoto, 800, 0.7);

        // Paso 2: Convertir imágenes a base64
        console.log('Paso 2: Convirtiendo imágenes...');
        const userPhotoBase64 = await this.fileToBase64(optimizedPhoto);
        const flyerTemplateBase64 = await this.getFlyerTemplateAsBase64();

        // Paso 3: Usar Gemini para fusionar las imágenes
        console.log('Paso 3: Generando flyer con IA...');

        // Log de la petición
        this.logRequest('Iniciando generación de flyer', {
          attempt: attempt,
          participantName: participantName,
          photoSize: optimizedPhoto.size,
          photoType: optimizedPhoto.type
        });

        const ai = new GoogleGenAI({
          apiKey: this.GEMINI_API_KEY
        });

        const prompt = [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: flyerTemplateBase64,
            },
          },
          {
            inlineData: {
              mimeType: optimizedPhoto.type || "image/jpeg",
              data: userPhotoBase64,
            },
          },
          {
            text: `Create a professional personalized flyer for Hack[CIS] 2025. Use the flyer template from the first image as the base, and seamlessly integrate the person's photo from the second image into it.  

Instructions:
- Final format must be 4:5 aspect ratio, optimized for social media.
- Use the flyer template from the first image as the background design.
- Remove the background from the second image automatically, keeping only the person.
- Place the person naturally and proportionally in the central area of the flyer.
- Apply a soft blur/fade effect at the bottom of the person so they blend smoothly with the template.
- Preserve all original template elements (logos, text, colors, and design).
- Ensure the integration looks professional, realistic, and high-quality.
- Output must be one final flyer image, ready to share on social media.

${participantName ? `Include the participant's name: ${participantName}` : ''}`
          },
        ];

        // Log del prompt enviado
        const textPrompt = prompt.find(item => 'text' in item);
        this.logRequest('Enviando prompt a Gemini', {
          model: "gemini-2.5-flash-image-preview",
          promptLength: textPrompt?.text?.length || 0,
          imagesCount: 2
        });

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash-image-preview", // Modelo más estable
          contents: prompt,
        });

        // Log de la respuesta
        this.logRequest('Respuesta recibida de Gemini', {
          candidatesCount: response.candidates?.length || 0,
          hasContent: !!response.candidates?.[0]?.content
        });

        // Procesar la respuesta
        if (response.candidates && response.candidates[0]?.content?.parts) {
          for (const part of response.candidates[0].content.parts) {
            if (part.inlineData && part.inlineData.data) {
              const imageData = part.inlineData.data;

              // Convertir base64 a blob URL para mostrar
              const buffer = Uint8Array.from(atob(imageData), (c: string) => c.charCodeAt(0));
              const blob = new Blob([buffer], { type: 'image/png' });
              const url = URL.createObjectURL(blob);

              this.logRequest('Flyer generado exitosamente', {
                blobSize: blob.size,
                attempt: attempt
              });

              console.log('✅ Flyer generado exitosamente');
              return url;
            }
          }
        }

        throw new Error('No se recibió imagen en la respuesta de Gemini');

      } catch (error) {
        console.error(`❌ Error en intento ${attempt}:`, error);

        // Log del error
        this.logRequest(`Error en intento ${attempt}`, {
          error: error instanceof Error ? error.message : 'Error desconocido',
          attempt: attempt,
          maxRetries: maxRetries
        });

        // Manejo de errores con reintentos
        if (error instanceof Error &&
          (error.message.includes('quota') ||
            error.message.includes('RESOURCE_EXHAUSTED') ||
            error.message.includes('429')) &&
          attempt < maxRetries) {

          // Aplicar backoff exponencial para errores de cuota
          const waitTime = Math.pow(2, attempt) * 1000; // Backoff exponencial: 2s, 4s, 8s
          console.log(`⏳ Esperando ${waitTime / 1000}s antes del siguiente intento...`);

          this.logRequest('Aplicando backoff exponencial', {
            waitTime: waitTime,
            nextAttempt: attempt + 1
          });

          await this.delay(waitTime);
          continue; // Continuar con el siguiente intento
        }

        // Si llegamos aquí, es el último intento o un error no recuperable
        this.logRequest('Intento fallido', {
          attempt: attempt,
          maxRetries: maxRetries,
          error: error instanceof Error ? error.message : 'Error desconocido',
          isLastAttempt: attempt === maxRetries
        });

        // Si no es el último intento, continuar (para otros tipos de errores)
        if (attempt < maxRetries) {
          console.log(`🔄 Reintentando... (${attempt}/${maxRetries})`);
          continue;
        }

        // Último intento fallido - lanzar error final
        if (error instanceof Error) {
          if (error.message.includes('quota') || error.message.includes('RESOURCE_EXHAUSTED') || error.message.includes('429')) {
            throw new Error('⚠️ Límite de uso de la API alcanzado. Por favor espera unos minutos e intenta nuevamente.');
          } else if (error.message.includes('API_KEY') || error.message.includes('API Key')) {
            throw new Error('⚠️ Error de autenticación con Google AI. Verifica tu API key.');
          } else if (error.message.includes('network') || error.message.includes('fetch')) {
            throw new Error('⚠️ Error de conexión. Verifica tu internet e intenta nuevamente.');
          } else {
            throw new Error(`⚠️ Error al generar flyer: ${error.message}`);
          }
        }
        throw new Error('⚠️ Error desconocido al generar el flyer. Intenta nuevamente.');
      }
    }

    // Este punto no debería alcanzarse nunca
    throw new Error('⚠️ No se pudo generar el flyer después de todos los intentos.');
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
    } catch (error) {
      console.error('Error descargando flyer:', error);
      throw new Error('No se pudo descargar el flyer');
    }
  }

  /**
   * Verificar si el servicio está configurado correctamente
   */
  static isConfigured(): boolean {
    return !!this.GEMINI_API_KEY;
  }

  /**
   * Obtener estadísticas de uso
   */
  static getUsageStats() {
    return {
      totalRequests: this.requestCount,
      isConfigured: this.isConfigured(),
      apiKeyPresent: !!this.GEMINI_API_KEY
    };
  }

  /**
   * Resetear contador de peticiones
   */
  static resetStats() {
    this.requestCount = 0;
    console.log('📊 Estadísticas de uso reseteadas');
  }
}