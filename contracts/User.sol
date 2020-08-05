pragma solidity ^0.5.16;
//pragma solidity ^0.4.19;
import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract User {
    struct UserStruct {
        address userAddress;
        string userName;
        uint256 index;
    }

    //定义用户列表数据结构
    struct UserListStruct {
        address userAddress;
        uint256 index;
    }

    address[] private userAddresses; //所有地址集合
    string[] public userNames; //所有用户名集合
    mapping(address => UserStruct) private userStruct; //账户个人信息

    mapping(string => UserListStruct) private userListStruct; //用户名映射地址

    //判断用户地址是否存在
    function isExitUserAddress(address _userAddress)
        public
        view
        returns (bool isIndeed)
    {
        if (userAddresses.length == 0) return false;
        return (userAddresses[userStruct[_userAddress].index] == _userAddress);
    }

    //判断用户名是否存在
    function isExituserName(string memory _userName)
        public
        view
        returns (bool isIndeed)
    {
        if (userNames.length == 0) return false;
        return (keccak256(
            abi.encodePacked(userNames[userListStruct[_userName].index])
        ) == keccak256(abi.encodePacked(_userName)));
    }

    //根据用户名查找对于的address
    function findUserAddressByuserName(string memory _userName)
        public
        view
        returns (address userAddress)
    {
        require(isExituserName(_userName));
        return userListStruct[_userName].userAddress;
    }

    //创建用户信息
    function createUser(address _userAddress, string memory _userName)
        public
        returns (uint256 index)
    {
        require(!isExitUserAddress(_userAddress)); //如果地址已存在则不允许再创建

        userAddresses.push(_userAddress); //地址集合push新地址
        userStruct[_userAddress] = UserStruct(
            _userAddress,
            _userName,
            userAddresses.length - 1
        );

        userNames.push(_userName); //用户名集合push新用户
        userListStruct[_userName] = UserListStruct(
            _userAddress,
            userNames.length - 1
        ); //用户所对应的地址集合

        return userAddresses.length - 1;
    }

    //获取用户个人信息
    function findUser(address _userAddress)
        public
        view
        returns (
            address userAddress,
            string memory userName,
            uint256 index
        )
    {
        require(isExitUserAddress(_userAddress));
        return (
            userStruct[_userAddress].userAddress,
            userStruct[_userAddress].userName,
            userStruct[_userAddress].index
        );
    }
}
