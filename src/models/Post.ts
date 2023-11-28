export interface Post {
    answer: string,
    requiredPoints: number,
    description: string,
    title:string,
    deadline: string,
    parentId: number | null,
    points: number,
    row: number,
    column: number,
}

export interface UpdatePost{
    title : string,
    description : string,
    answer : number,
    points : number,
    requiredPoints : number,
    deadline : string,
}