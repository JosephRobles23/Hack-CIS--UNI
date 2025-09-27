export interface GameMessage {
    id : string;
    role: 'user' | 'assistant'; 
    content: string;
    image?: string;
    imageLoading?: string;
}


export interface GenerateImage {
    base64: string;
    mediaType: string;
    uint8ArrayData: Uint8Array;
}

export interface ConversationMessage {
    role: 'user' | 'assistant';
    content: string;
    image?: string;
    imageLoading?: string;
}
export interface GenerateStoryRequest {
    userMessage: string;
    conversationHistory: ConversationMessage[];
    isStart: boolean;
}

export interface GenerateStoryResponse {
    story: string;
    image: GenerateImage;
}

export interface GenerateImageRequest {
    imagePrompt: string;
}