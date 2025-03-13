// create mock for Auth.ts file

export class Auth {
    
    private user = {
        id: 1,
        name: 'Jan',
        surname: 'Nowak'
    }

    GetUser() {
        return this.user
    }

}
  
