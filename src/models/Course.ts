export interface Course{
    name: string,
    discipline?: string,
    grade?: number | null,
    yearsFrom?: number | null,
    yearsTo?: number | null,
    id?: number
}