// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;

import "hardhat/console.sol";

/**
 * @title Muhammad Awais Shah
 * @dev Set & change owner
 */
contract Subscription {
    struct Blog {
        string blogId;
        address author;
        string title;
    }
    mapping(string => Blog) public blogs;
    mapping(string => bool) public blogRegisterd;
    mapping(address => mapping(string => bool)) public subs;

    event Registerd(string indexed blogId, address indexed author);
    event Subscribed(string indexed blogId, address indexed reader);

    function subscribe(Blog memory blog, address reader) public {
        require(blogRegisterd[blog.blogId], "Blog not  Registerd");

        subs[reader][blog.blogId] = true;
        emit Subscribed(blog.blogId, reader);
    }

    function register(Blog memory blog) public {
        require(!blogRegisterd[blog.blogId], "Already Registerd");

        blogs[blog.blogId] = blog;

        blogRegisterd[blog.blogId] = true;

        emit Registerd(blog.blogId, msg.sender);
    }
}
