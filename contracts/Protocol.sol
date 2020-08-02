pragma solidity ^0.5.16;
//pragma solidity ^0.4.19;
import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";


contract Protocol is Ownable {
    mapping(address => uint256) private contribution;
    mapping(address => address) private invitation;
    mapping(address => uint256) private policy_time;
    mapping(address => bool) private in_network;
    mapping(address => uint256) private reward;

    uint256 cooldown_time = 5 seconds; //单位时间
    uint256 total_user_num;
    uint256 alpha;
    uint256 beta;
    uint256 randNonce = 0;
    uint256 deadline = 0;
    address payable[] user_list;

    function min(uint256 _a, uint256 _b) private pure returns (uint256) {
        if (_a < _b) return _a;
        else return _b;
    }

    function initial(
        uint256 _alpha,
        uint256 _beta,
        uint256 _duration_time_in_minutes
    ) public onlyOwner {
        //_alpha,_beta为奖励参数
        //_duration_time_in_minutes 以分钟为单位的持续时间
        in_network[msg.sender] = true;
        policy_time[msg.sender] = now;
        contribution[msg.sender] = 0;
        reward[msg.sender] = 0;
        user_list.push(msg.sender);
        invitation[msg.sender] = msg.sender;
        total_user_num = 7;
        alpha = _alpha;
        beta = _beta;
        deadline = now + _duration_time_in_minutes * 60;
    }

    function calc_and_send_reward() public payable onlyOwner {
        require(now >= deadline);
        uint256 i;
        uint256 length = user_list.length;
        for (i = 0; i < length; ++i) {
            //计算自身工作贡献
            address self = user_list[i];
            reward[self] = reward[self] + contribution[self]**alpha;
            //计算他对邀请他的人的贡献
            address inviter = invitation[self];
            if (inviter != self)
                reward[inviter] =
                    reward[inviter] +
                    min(contribution[inviter], contribution[self])**beta;
        }

        for (i = 0; i < length; ++i) {
            address payable user = user_list[i];
            if (user != msg.sender) require(msg.sender.balance >= reward[user]);
            user.transfer(reward[user]);
        }
    }

    function make_policy(int256 kind, address invite_address) public {
        require(policy_time[msg.sender] <= now);
        require(now <= deadline);
        if (kind == -2) {
            //do nothing
        }
        if (kind == -1) {
            //接受邀请
            require(
                in_network[msg.sender] == false &&
                    invitation[msg.sender] != address(0)
            );
            user_list.push(msg.sender);
            in_network[msg.sender] = true;
            contribution[msg.sender] = 0;
            reward[msg.sender] = 0;
        }
        if (kind == 0) {
            //工作
            require(in_network[msg.sender] == true);
            contribution[msg.sender] += 1;
        }
        if (kind == 1) {
            //发出邀请
            require(
                in_network[msg.sender] == true &&
                    in_network[invite_address] == false
            );
            invitation[invite_address] = msg.sender;
        }
        policy_time[msg.sender] = now + cooldown_time;
    }

    //查询自己的贡献
    function show_contribution() public view returns (uint256) {
        return contribution[msg.sender];
    }

    //查询自己获得的奖励
    function show_reward() public view returns (uint256) {
        return reward[msg.sender];
    }

    function show_inviter() public view returns (address) {
        return invitation[msg.sender];
    }

    function get_my_address() public view returns (address) {
        return msg.sender;
    }
}
