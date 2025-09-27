"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Download, Share2, Upload, Loader2 } from "lucide-react"
import { FlyerComposerService } from "@/lib/flyer-composer"
import { toast } from "@/hooks/use-toast"

interface FlyerGeneratorModalProps {
    isOpen: boolean
    onClose: () => void
    participantName: string
}

export default function FlyerGeneratorModal({
    isOpen,
    onClose,
    participantName
}: FlyerGeneratorModalProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string>("")
    const [generatedFlyerUrl, setGeneratedFlyerUrl] = useState<string>("")
    const [isProcessing, setIsProcessing] = useState(false)
    const [generationProgress, setGenerationProgress] = useState(0)
    const [step, setStep] = useState<'upload' | 'preview' | 'generating' | 'generated'>('upload')

    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        // Validar tipo de archivo
        if (!file.type.startsWith('image/')) {
            toast({
                title: "Archivo inválido",
                description: "Por favor selecciona una imagen válida (JPG, PNG, etc.)",
                variant: "destructive"
            })
            return
        }

        // Validar tamaño (máximo 10MB)
        if (file.size > 10 * 1024 * 1024) {
            toast({
                title: "Archivo muy grande",
                description: "La imagen debe ser menor a 10MB",
                variant: "destructive"
            })
            return
        }

        setSelectedFile(file)

        // Crear preview
        const reader = new FileReader()
        reader.onload = (e) => {
            setPreviewUrl(e.target?.result as string)
            setStep('preview')
        }
        reader.readAsDataURL(file)
    }

    const handleGenerateFlyer = async () => {
        if (!selectedFile) return

        setIsProcessing(true)
        setGenerationProgress(0)
        setStep('generating') // Cambiar al paso de generación

        // Simular progreso de generación
        const simulateProgress = () => {
            let progress = 0
            const interval = setInterval(() => {
                progress += Math.random() * 10 + 3 // Incremento aleatorio entre 3-13%
                
                if (progress >= 95) {
                    progress = 95 // Dejar en 95% hasta que termine realmente
                    clearInterval(interval)
                }
                
                setGenerationProgress(Math.min(progress, 95))
            }, 200)
            
            return interval
        }

        const progressInterval = simulateProgress()

        try {
            const flyerUrl = await FlyerComposerService.generatePersonalizedFlyer(
                selectedFile,
                participantName
            )

            // Completar progreso
            clearInterval(progressInterval)
            setGenerationProgress(100)

            // Pequeña pausa para mostrar el 100%
            setTimeout(() => {
                setGeneratedFlyerUrl(flyerUrl)
                setStep('generated')
                setGenerationProgress(0)

                toast({
                    title: "¡Flyer generado! 🚀",
                    description: "Tu flyer personalizado está listo para compartir",
                })
            }, 500)

        } catch (error) {
            clearInterval(progressInterval)
            setGenerationProgress(0)
            setStep('preview') // Volver al preview en caso de error
            
            console.error('Error generando flyer:', error)
            toast({
                title: "Error al generar flyer",
                description: error instanceof Error ? error.message : "Intenta nuevamente",
                variant: "destructive"
            })
        } finally {
            setTimeout(() => {
                setIsProcessing(false)
            }, 500)
        }
    }

    const handleDownload = async () => {
        if (!generatedFlyerUrl) return

        try {
            const response = await fetch(generatedFlyerUrl)
            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)

            const link = document.createElement('a')
            link.href = url
            link.download = `hack-cis-2025-${participantName.replace(/\s+/g, '-').toLowerCase()}.png`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)

            window.URL.revokeObjectURL(url)

            toast({
                title: "¡Descargado! 📱",
                description: "Tu flyer se guardó en tu dispositivo",
            })
        } catch (error) {
            toast({
                title: "Error al descargar",
                description: "No se pudo descargar la imagen",
                variant: "destructive"
            })
        }
    }

    const handleShare = async () => {
        if (!generatedFlyerUrl) return

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Mi flyer para Hack[CIS] 2025',
                    text: `¡Estoy participando en Hack[CIS] 2025! 🚀 #HackCIS2025`,
                    url: generatedFlyerUrl
                })
            } catch (error) {
                // Usuario canceló o error en share
            }
        } else {
            // Fallback: copiar URL al clipboard
            try {
                await navigator.clipboard.writeText(generatedFlyerUrl)
                toast({
                    title: "¡Copiado! 📋",
                    description: "El enlace se copió al portapapeles",
                })
            } catch (error) {
                toast({
                    title: "Error al compartir",
                    description: "No se pudo copiar el enlace",
                    variant: "destructive"
                })
            }
        }
    }

    const resetModal = () => {
        setSelectedFile(null)
        setPreviewUrl("")
        setGeneratedFlyerUrl("")
        setStep('upload')
        setIsProcessing(false)
        setGenerationProgress(0)
    }

    const handleClose = () => {
        resetModal()
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-700">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                        Genera tu Flyer 🖌️
                    </h2>
                    <Button
                        onClick={handleClose}
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-white hover:bg-cyan-400 transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {step === 'upload' && (
                        <div className="text-center space-y-6">
                            <div className="space-y-2">
                                <h3 className="text-xl font-semibold text-white">
                                    Flexea tu lugar en la Hackathon 🚀
                                </h3>
                                <p className="text-gray-400">
                                    Carga tu foto y genera tu flyer oficial en segundos. Ready pa' romperla 😎🔥
                                </p>
                            </div>

                            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 hover:border-cyan-400 transition-colors">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                    id="photo-upload"
                                />
                                <label
                                    htmlFor="photo-upload"
                                    className="cursor-pointer flex flex-col items-center space-y-4"
                                >
                                    <Upload className="h-12 w-12 text-gray-400" />
                                    <div className="text-center">
                                        <p className="text-white font-medium">Sube tu foto</p>
                                        <p className="text-sm text-gray-400">JPG, PNG (máx. 10MB)</p>
                                    </div>
                                </label>
                            </div>
                        </div>
                    )}

                    {step === 'preview' && (
                        <div className="space-y-6">
                            <div className="text-center">
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    ¿Te gusta cómo se ve?
                                </h3>
                                <p className="text-gray-400">
                                    Esta foto se usará para generar tu flyer personalizado
                                </p>
                            </div>

                            <div className="flex justify-center">
                                <div className="relative">
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="max-w-xs max-h-64 object-contain rounded-lg border border-gray-600"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-center space-x-4">
                                <Button
                                    onClick={() => setStep('upload')}
                                    variant="outline"
                                    className="border-gray-600 text-white bg-gray-800 hover:bg-white hover:text-gray-900"
                                >
                                    Cambiar foto
                                </Button>
                                <Button
                                    onClick={handleGenerateFlyer}
                                    disabled={isProcessing}
                                    className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-black font-semibold"
                                >
                                    Generar Flyer 🎨
                                </Button>
                            </div>
                        </div>
                    )}

                    {step === 'generating' && (
                        <div className="space-y-6">
                            <div className="text-center">
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    Generando tu flyer 🎨
                                </h3>
                                <p className="text-gray-400">
                                    Eliminando fondo con IA y creando tu flyer personalizado...
                                </p>
                            </div>

                            {/* Loader circular grande */}
                            <div className="flex justify-center">
                                <div className="flex flex-col items-center space-y-4">
                                    <div className="relative w-20 h-20">
                                        {/* Círculo de fondo */}
                                        <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
                                            <circle
                                                cx="50"
                                                cy="50"
                                                r="40"
                                                stroke="currentColor"
                                                strokeWidth="8"
                                                fill="transparent"
                                                className="text-gray-700"
                                            />
                                            {/* Círculo de progreso */}
                                            <circle
                                                cx="50"
                                                cy="50"
                                                r="40"
                                                stroke="currentColor"
                                                strokeWidth="8"
                                                fill="transparent"
                                                strokeDasharray={`${2 * Math.PI * 40}`}
                                                strokeDashoffset={`${2 * Math.PI * 40 * (1 - generationProgress / 100)}`}
                                                className="text-cyan-400 transition-all duration-300 ease-out"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        {/* Porcentaje en el centro */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-cyan-400 font-bold text-sm">
                                                {Math.round(generationProgress)}%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-cyan-400 font-medium">Procesando con IA...</p>
                                        <p className="text-sm text-gray-400">
                                            {generationProgress < 30 ? 'Eliminando fondo de la imagen' :
                                             generationProgress < 70 ? 'Componiendo el flyer' :
                                             generationProgress < 95 ? 'Aplicando efectos finales' :
                                             'Finalizando...'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 'generated' && (
                        <div className="space-y-6">
                            <div className="text-center">
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    ¡Tu flyer está listo! 🔥
                                </h3>
                                <p className="text-gray-400">
                                    Compártelo en tus redes y muestra que estás en Hack[CIS] 2025
                                </p>
                            </div>

                            <div className="flex justify-center">
                                <div className="w-64 h-auto flex items-center justify-center">
                                    <img
                                        src={generatedFlyerUrl}
                                        alt="Flyer generado"
                                        className="object-contain rounded-lg border border-gray-600 shadow-2xl max-w-full max-h-96"
                                        style={{ aspectRatio: '1080/1920' }}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-center space-x-4">
                                <Button
                                    onClick={handleDownload}
                                    variant="outline"
                                    className="border-gray-600 text-white bg-gray-800 hover:bg-white hover:text-gray-900"
                                >
                                    <Download className="mr-2 h-4 w-4" />
                                    Descargar
                                </Button>
                                <Button
                                    onClick={handleShare}
                                    className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-black font-semibold"
                                >
                                    <Share2 className="mr-2 h-4 w-4" />
                                    Compartir
                                </Button>
                            </div>

                            <div className="text-center">
                                <Button
                                    onClick={() => setStep('upload')}
                                    variant="ghost"
                                    className="text-gray-400 hover:text-black text-sm"
                                >
                                    Generar otro flyer
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}