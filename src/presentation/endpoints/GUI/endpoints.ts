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
    new Endpoint("Create Band", "/bands", "POST", {}, { "name": "", "genre": "", "responsible": "" }),
    new Endpoint("Get Band By Name Or Id", "/bands?name=bandName", "GET", {}),
    new Endpoint("Create Show", "/shows", "POST", {}, { "day": "", "startTime": "", "endTime": "", "bandId": "" }),
    new Endpoint("Get Shows By Day", "/shows/:day", "GET", {})
]