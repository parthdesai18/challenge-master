'use strict';
const e = require("express");
const _ = require('lodash');
const db = require('./db.js');


// UTILS
//----------------
// This is a mock db call that waits for # milliseconds and returns
const mockDBCall = (dataAccessMethod) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(dataAccessMethod());
        }, 500);
    });
};

// MOCK DB CALLS
//----------------
const getUsers = () => {
    const dataAccessMethod = () => _.map(db.usersById, (userInfo) => userInfo)
    return mockDBCall(dataAccessMethod);
};

const getListOfAgesOfUsersWith = (item) => {
    const dataAccessMethod = () => {
        // map to store based on users
        let userMap = {};
        for(const key in db.usersByID){
            userMap[db.usersById[key].username] = db.usersById[key].age;
        }

        //map to store items based on age group with count
        let itemMap = {};
        for(const key in db.itemsOfUserByUsername){
            const ageGroup = userMap[key];
            db.itemsOfUserByUsername[key].forEach((item) => {
                if(!itemMap[item]){
                    itemMap[item] = {};
                }

                if(!itemMap[item][ageGroup]){
                    itemMap[item][ageGroup] = 1;
                }else{
                    itemMap[item][ageGroup] += 1;
                }
            });
        }
        return itemMap;
    };
    return mockDBCall(dataAccessMethod);
}

module.exports = {
    getUsers,
    getListOfAgesOfUsersWith
};
