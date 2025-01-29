import UserRole from "../shared/userRole.enum";

class UserDto {    

  username: string;  
  
  email: string;
  
  password: string;
  
  firstName: string;
  
  lastName: string;
  
  phoneNumber:string;
  
  address: string;
  
  city: string;
  
  state: string;
  
  zipCode: string;
  
  country: string;
  
  createdAt: Date;

  updatedAt: Date;

  role: UserRole;
}

export default UserDto;
