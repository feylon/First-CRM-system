'use strict'

import bcrypt from "bcrypt";

async function hash(password){
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
    };

async function check(password, hash){
return await bcrypt.compare(password, hash);
};


export {hash, check};