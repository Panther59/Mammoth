export class User {
    id: number;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    token: string;
    type: string;

    isAdminUser(): boolean {
        if (this.type == 'Administrator') {
            return true;
        }
        else {
            return false;
        }
    }

    isSuperUser(): boolean {
        if (this.type == 'Super User') {
            return true;
        }
        else {
            return false;
        }
    }
}