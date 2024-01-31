export interface ShareMessage {
    groupId: number | null,
    courseId: number,
    postId: number,
    users: any[],
    text: string,
    points: number,
    deadline: string
}