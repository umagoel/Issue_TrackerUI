// import { Company } from '@shared/models';
// import { Transaction } from 'app/layout/transactions/models/transaction.model';

export class User {

public emailId: string;
public firstName: string;
public lastName: string;
public password: string
public role: string;
public fullName: string;
constructor(obj?: User) {
this.emailId = obj && obj.emailId ? obj.emailId : null;
this.firstName = obj && obj.firstName ? obj.firstName : null;
this.lastName = obj && obj.lastName ? obj.lastName : null;
this.password = obj && obj.password ? obj.password : null;
this.role = obj && obj.role ? obj.role : null;
this.fullName = obj && obj.fullName ? obj.fullName : null;
}
}
