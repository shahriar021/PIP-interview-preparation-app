export type Option = {
    id: number
    text: string
    is_correct: boolean
}

export type Question = {
    id: number
    text: string
    hint: string
    options: Option[]
    audio_file: string
    points: number
}