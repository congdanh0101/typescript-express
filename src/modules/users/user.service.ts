import UserRepository from "./user.repository";

class UserService{

    private readonly userRepository = new UserRepository();

    public getAllUsers = async () => this.userRepository.getUsers() ;
}

export default UserService;