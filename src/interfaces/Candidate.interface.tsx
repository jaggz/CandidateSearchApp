// TODO: Create an interface for the Candidate objects returned by the API
export default interface Candidate{
    name:string|null,
    login:string,
    email:string|null,
    location:string|null,
    html_url:string|null,
    company:string|null,
    avatar_url:string|null,
    bio:string|null,
}