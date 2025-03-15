// create mock for Auth.ts file

type User = {
    id: number
    name: string
    surname: string
    role: "admin" | "devops" | "developer"
}

export class Auth {



    private users: User[] = [{
        id: 1,
        name: 'Jan',
        surname: 'Nowak',
        role: "devops"
    },
    {
        id: 2,
        name: 'Michał',
        surname: 'Kowalski',
        role: "admin"
    },
    {
        id: 3,
        name: 'Adrian',
        surname: 'Lech',
        role: "developer"
    },
    ]

    GetActiveUser() {
        return this.users[0]
    }

    getUsers() {
        return this.users
    }

}

