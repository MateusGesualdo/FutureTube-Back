class Endpoint {
    constructor(
        public name: string,
        public path: string,
        public method: string,
        public headers: any,
        public body?: any
    ) {
        this.path = "http://localhost:3000" + path
        this.headers["Content-Type"] = "application/json"
    }
}

export const endpoints = [
    new Endpoint("Signup", "/users/signup", "POST", {}, { "name": "", "email": "", "password": "", "birthDate": "", "profilePicture": "" }),
    new Endpoint("Login", "/users/login", "POST", {}, { "email": "", "password": "" }),
    new Endpoint("Get User By Id", "/users/:id", "GET", {}),
    new Endpoint("Change Password", "/users/password", "POST", { "authorization": "" }, { "currentPassword": "", "newPassword": "" }),
    new Endpoint("Get All Videos", "/videos/all?page=1", "GET", {}),
    new Endpoint("Get User Uploads", "/videos?userId=", "GET", { "authorization": "" }),
    new Endpoint("Get Video By Id", "/videos/:id", "GET", {}),
    new Endpoint("Upload Video", "/videos/upload", "POST", { "authorization": "" }, { "title": "", "description": "", "url": "" }),
    new Endpoint("Edit Video", "/videos/edit", "PUT", { "authorization": "" }, { "videoId": "", "newTitle": "", "newDescription": "" }),
    new Endpoint("Delete Video", "/videos/:videoId", "DELETE", { "authorization": "" })
]