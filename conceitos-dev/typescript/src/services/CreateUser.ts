
interface TechObject {
    title: string;
    experience: number;
}

interface CreateUserData {
    name ?: string;
    email : string;
    password: string;
    techs: Array<string | TechObject >; //string[]
}

export default function CreateUser({name , email , password, techs} : CreateUserData) {
    const user = {
        name,
        email,
        password,
    }

    return user;
}