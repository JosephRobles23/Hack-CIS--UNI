'use client'

import { useEffect, useState, useRef } from 'react'
import {
    Conversation,
    ConversationContent,
    ConversationEmptyState,
    ConversationScrollButton
} from '@/components/ai-elements/conversation'
import {
    Message,
    MessageContent,
    MessageAvatar
} from '@/components/ai-elements/message'
import { Response } from '@/components/ai-elements/response'
import { Loader } from '@/components/ai-elements/loader'
import {
    PromptInput,
    PromptInputBody,
    PromptInputTextarea,
    PromptInputToolbar,
    PromptInputTools,
    PromptInputSubmit
} from '@/components/ai-elements/prompt-input'
import {
    Suggestions,
    Suggestion
} from '@/components/ai-elements/suggestion'
import {
    Artifact,
    ArtifactHeader,
    ArtifactTitle,
    ArtifactContent
} from '@/components/ai-elements/artifact'
import { Bot, User, Zap, Sparkles, Brain, Lightbulb } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface MessageType {
    id: string;
    role: 'assistant' | 'user';
    content: string;
}

// Componente atomizado para el header
const BootHeader = () => (
    <div className='border-b border-zinc-800 bg-zinc-900/95 backdrop-blur supports-[backdrop-filter]:bg-zinc-900/60 sticky top-0 z-50'>
        <div className='container mx-auto px-2 sm:px-4 py-3 sm:py-4'>
            <div className='flex items-center gap-2 sm:gap-3'>
                <div className='flex items-center gap-1 sm:gap-2'>
                    <Zap className='h-5 w-5 sm:h-6 sm:w-6 text-purple-500' />
                    <h1 className='text-lg sm:text-xl font-bold text-white'>
                        <span className="hidden sm:inline">Cispy - Hack[CIS] UNI</span>
                        <span className="sm:hidden">Cispy</span>
                    </h1>
                    <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 border-purple-500/30 hidden sm:flex">
                        <Sparkles className="w-3 h-3 mr-1" />
                        AI Assistant
                    </Badge>
                </div>
                <div className='ml-auto text-xs sm:text-sm text-zinc-400'>
                    <span className="hidden sm:inline">IEEE CIS HACKATHON</span>
                    <span className="sm:hidden">CIS</span>
                </div>
            </div>
        </div>
    </div>
);

// Componente atomizado para mensajes de Cispy (izquierda)
const CispyMessage = ({ message }: { message: MessageType }) => (
    <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4 mr-2 sm:mr-8">
        <MessageAvatar
            src="/images/LOGO_BOOT.png"
            name="Cispy"
            className="bg-gradient-to-br from-purple-400 to-purple-600 text-white ring-2 ring-purple-500/30 flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10"
        />
        <div className="bg-zinc-800 text-white rounded-2xl rounded-tl-md px-3 sm:px-4 py-2 sm:py-3 max-w-[75%] sm:max-w-xs md:max-w-md lg:max-w-lg shadow-lg">
            <Response className="text-white text-sm sm:text-base [&_strong]:text-purple-300 [&_h1]:text-white [&_h2]:text-zinc-200 [&_h3]:text-zinc-300 [&_p]:leading-relaxed">
                {message.content}
            </Response>
        </div>
    </div>
);

// Componente atomizado para mensajes del usuario (derecha)
const UserMessage = ({ message }: { message: MessageType }) => (
    <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4 ml-2 sm:ml-8 justify-end">
        <div className="bg-blue-500 text-white rounded-2xl rounded-tr-md px-3 sm:px-4 py-2 sm:py-3 max-w-[75%] sm:max-w-xs md:max-w-md lg:max-w-lg shadow-lg">
            <Response className="text-white text-sm sm:text-base [&_p]:text-white [&_span]:text-white [&_div]:text-white [&_p]:leading-relaxed">
                {message.content}
            </Response>
        </div>
        <MessageAvatar
            src="/placeholder-user.jpg"
            name="Tú"
            className="bg-blue-500 text-white ring-2 ring-blue-400/30 flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10"
        />
    </div>
);

// Componente atomizado para el estado de carga
const ThinkingState = () => (
    <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4 mr-2 sm:mr-8">
        <MessageAvatar
            src="/images/LOGO_BOOT.png"
            name="Cispy"
            className="bg-gradient-to-br from-purple-400 to-purple-600 text-white ring-2 ring-purple-500/30 flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10"
        />
        <div className="bg-zinc-800 text-white rounded-2xl rounded-tl-md px-3 sm:px-4 py-2 sm:py-3 shadow-lg">
            <div className='flex items-center gap-2 sm:gap-3'>
                <Loader size={14} className="text-purple-400 sm:w-4 sm:h-4" />
                <span className='text-zinc-300 text-sm sm:text-base'>
                    Cispy está pensando...
                </span>
                <div className="flex gap-1">
                    <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
                    <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-200"></div>
                </div>
            </div>
        </div>
    </div>
);

// Componente para sugerencias de preguntas
const QuestionSuggestions = ({ onSuggestionClick }: { onSuggestionClick: (suggestion: string) => void }) => {
    const suggestions = [
        "Ayúdame con ideas para mi proyecto",
        "¿Cómo puedo crear un pitch impactante?",
        "Necesito ideas para el branding",
        "¿Qué tecnologías puedo usar?",
        "Ayúdame con la presentación"
    ];

    return (
        <div className="mb-4 sm:mb-6 mr-2 sm:mr-8">
            <p className="text-zinc-400 text-xs sm:text-sm mb-2 sm:mb-3 flex items-center gap-2 ml-10 sm:ml-14">
                <Brain className="w-3 h-3 sm:w-4 sm:h-4" />
                Sugerencias para comenzar:
            </p>
            <div className="ml-10 sm:ml-14">
                <Suggestions className="mb-2">
                    {suggestions.map((suggestion, index) => (
                        <Suggestion
                            key={index}
                            suggestion={suggestion}
                            onClick={onSuggestionClick}
                            className="bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-200 border-zinc-600/50 whitespace-nowrap backdrop-blur-sm text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
                            variant="outline"
                        />
                    ))}
                </Suggestions>
            </div>
        </div>
    );
};

export default function BootPage() {
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Cargar mensaje inicial de Cispy
    useEffect(() => {
        // Mostrar mensaje de bienvenida inmediatamente
        setMessages([{
            id: '1',
            role: 'assistant',
            content: `¡Hola! 👋 Soy **Cispy**, tu compañero inteligente para la Hack[CIS] UNI.

🚀 Estoy aquí para ayudarte a generar ideas creativas e innovadoras para tu proyecto. Como tu asistente oficial, mi misión es potenciar tu creatividad y hacer que tu equipo destaque.

💡 Puedo ayudarte con:
- Generar ideas innovadoras para tu solución
- Crear presentaciones impactantes
- Diseñar material visual para tu proyecto

¿En qué proyecto estás trabajando? ¡Cuéntame tus ideas! 🎯`
        }]);
        setLoading(false);
    }, []);

    const handleSubmit = async (message: { text?: string; files?: any[] }) => {
        if (!message.text?.trim()) return;
        submitMessage(message.text);
    };

    const submitMessage = async (text: string) => {
        const userMessage: MessageType = {
            id: Date.now().toString(),
            role: 'user',
            content: text
        };

        setMessages(prev => [...prev, userMessage]);
        setIsSubmitting(true);
        setError('');

        try {
            const conversationHistory = messages.map(msg => ({
                role: msg.role,
                content: msg.content
            }));

            const response = await fetch('/api/hacker/generate-story', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userMessage: text,
                    conversationHistory,
                    isStart: false,
                }),
            });

            const data = await response.json();

            if (data.success) {
                const assistantMessage: MessageType = {
                    id: (Date.now() + 1).toString(),
                    role: 'assistant',
                    content: data.message
                };
                setMessages(prev => [...prev, assistantMessage]);
            } else {
                setError(data.error || 'Error al generar la respuesta');
            }
        } catch (error) {
            console.error('Error al enviar mensaje:', error);
            setError('Error de conexión al enviar el mensaje');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        submitMessage(suggestion);
    };

    return (
        <div className='h-screen bg-black flex flex-col'>
            {/* Header Component */}
            <BootHeader />

            {/* Chat Area - Takes remaining space */}
            <div className='flex-1 min-h-0 container mx-auto px-2 sm:px-4 max-w-6xl'>
                <Conversation className='h-full bg-zinc-900/30 rounded-lg mt-2 sm:mt-4 backdrop-blur-sm border border-zinc-800/30'>
                    <ConversationContent className='px-3 sm:px-6 py-4'>

                        {/* Error Display */}
                        {error && (
                            <div className="mb-4 sm:mb-6 bg-red-900/20 border border-red-800/50 rounded-xl p-3 sm:p-4">
                                <div className="text-red-400 flex items-center gap-2 font-medium mb-2 text-sm sm:text-base">
                                    <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
                                    Error de Conexión
                                </div>
                                <div className="text-red-300 text-xs sm:text-sm">
                                    {error}
                                </div>
                            </div>
                        )}

                        {/* Loading State */}
                        {loading ? (
                            <ConversationEmptyState
                                title="Iniciando Cispy..."
                                description="Preparando tu asistente inteligente para la hackathon"
                                icon={<Loader size={32} className="text-purple-400" />}
                                className="text-zinc-300 text-sm sm:text-base"
                            />
                        ) : (
                            <>
                                {/* Welcome Message and Suggestions */}
                                {messages.length === 1 && (
                                    <>
                                        <CispyMessage message={messages[0]} />
                                        <QuestionSuggestions onSuggestionClick={handleSuggestionClick} />
                                    </>
                                )}

                                {/* Conversation Messages */}
                                {messages.length > 1 && messages.slice(1).map((message) => {
                                    if (message.role === 'assistant') {
                                        return <CispyMessage key={message.id} message={message} />;
                                    } else {
                                        return <UserMessage key={message.id} message={message} />;
                                    }
                                })}

                                {/* Thinking State */}
                                {isSubmitting && <ThinkingState />}
                            </>
                        )}
                    </ConversationContent>

                    {/* Scroll to Bottom Button */}
                    <ConversationScrollButton className="bg-zinc-800/80 hover:bg-zinc-700/80 border-zinc-600" />
                </Conversation>
            </div>

            {/* Fixed Input Area at Bottom */}
            <div className='border-t border-zinc-800/50 bg-black/95 backdrop-blur-sm p-2 sm:p-4 safe-area-bottom'>
                <div className='container mx-auto max-w-6xl'>
                    <PromptInput
                        onSubmit={handleSubmit}
                        className='w-full max-w-none sm:max-w-4xl sm:mx-auto bg-zinc-800/80 border-zinc-700/50 backdrop-blur-sm shadow-2xl'
                    >
                        <PromptInputBody>
                            <div className='flex justify-between gap-2 sm:gap-4'>
                                <PromptInputTextarea
                                    placeholder="¿En qué puedo ayudarte con tu proyecto?"
                                    disabled={loading || isSubmitting}
                                    className="bg-transparent text-zinc-100 placeholder:text-zinc-500 min-h-[50px] sm:min-h-[60px] text-sm sm:text-base resize-none"
                                />
                                <div className='flex items-center'>
                                 <PromptInputSubmit 
                                    disabled={loading || isSubmitting}
                                    status={isSubmitting ? 'streaming' : undefined}
                                     className="bg-gradient-to-r p-2 mr-1 from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium shadow-lg hover:shadow-purple-500/20 transition-all duration-200"
                                />
                                </div>
                            </div>
        
                        {/* <PromptInputToolbar className="border-t border-zinc-700/50 bg-zinc-800/50"> */}
                            {/* <PromptInputTools>
                                <div className='flex items-center gap-2 sm:gap-4'>
                                    <div className='text-xs text-zinc-500 flex items-center gap-1'>
                                        <Lightbulb className="w-3 h-3" />
                                        <span className="hidden sm:inline">
                                            {messages.length > 0 && !loading && (
                                                `${messages.length} mensajes`
                                            )}
                                        </span>
                                    </div>
                                    {!loading && (
                                        <Badge variant="outline" className="text-xs bg-zinc-700/50 text-zinc-400 border-zinc-600 hidden sm:flex">
                                            <Sparkles className="w-3 h-3 mr-1" />
                                            Cispy listo
                                        </Badge>
                                    )}
                                </div>
                            </PromptInputTools> */}
                           {/*  <PromptInputSubmit
                                disabled={loading || isSubmitting}
                                status={isSubmitting ? 'streaming' : undefined}
                                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium shadow-lg hover:shadow-purple-500/20 transition-all duration-200"
                            /> */}
                       {/*  </PromptInputToolbar> */}
                    </PromptInputBody>
                </PromptInput>
            </div>
        </div>
        </div >
    );
}