export default class Video {
    constructor(
        private id: string,
        private title: string,
        private description: string,
        private url: string,
        private userId: string
    ) { }

    getId = () => this.id
    getTitle = () => this.title
    getDescription = () => this.description
    getUrl = () => this.url
    getUserId = () => this.userId

}