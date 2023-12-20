export interface Post {
    answer: string,
    requiredPoints: number,
    description: string,
    title:string,
    parentId: number | null,
    points: number,
    row: number,
    column: number,
    color: string,
    type: string,
}

export interface UpdatePost{
    title : string,
    description : string,
    answer : string,
    points : number,
    requiredPoints : number,
    deadline : string,
}

export interface sharePost {
    groups: any,
    comment: string,
    deadline: string,
}