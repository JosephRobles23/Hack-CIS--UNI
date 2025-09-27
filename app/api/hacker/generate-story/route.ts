import { google } from '@ai-sdk/google'
import { generateText } from 'ai'

import { type NextRequest, NextResponse } from 'next/server';
import { GAME_PROMPTS } from '@/lib/prompts'
import { GAME_CONFIG } from '@/lib/consts'

// Configurar el modelo con la API key desde las variables de entorno
const gemini = google('gemini-2.0-flash-exp');

interface GenerateStoryRequest {
    userMessage: string;
    conversationHistory: Array<{ role: string; content: string }>;
    isStart: boolean;
}

export async function POST(request: NextRequest) {
    try {
        // Verificar que la API key esté configurada
        if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
            console.error('API key de Gemini no configurada');
            return NextResponse.json(
                { error: 'API key de Gemini no configurada' }, 
                { status: 500 }
            );
        }

        const { userMessage, conversationHistory, isStart }: GenerateStoryRequest = await request.json();
        let prompt: string = GAME_PROMPTS.INITIAL_BOOT_MESSAGE;
        
        if (!isStart) {
            const historyText = conversationHistory.map(
                (message) => `${message.role}: ${message.content}`
            ).join('\n');

            prompt = GAME_PROMPTS.CONTINUE_STORY(historyText, userMessage);
        }

        const { text } = await generateText({
            model: gemini,
            prompt 
        });

        console.log('Generated message:', text);

        // Devolver la respuesta correctamente
        return NextResponse.json({ 
            message: text,
            success: true 
        });

    } catch (error) {
        console.error('Error al generar la respuesta:', error);
        return NextResponse.json({ 
            error: 'Error al generar la respuesta',
            details: error instanceof Error ? error.message : 'Error desconocido'
        }, { status: 500 });
    }
}