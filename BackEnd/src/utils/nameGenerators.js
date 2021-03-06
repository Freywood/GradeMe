const { getUserByLoginName } = require("../db/user/getUser");

exports.generateCourseName = (subjectName='', courseYear=0) =>  
{
    if (!validateArgs([
        {value: subjectName, type: 'string'},
        {value: courseYear, type: 'number'},
        ])) throw new Error('subjectName must be of type String and courseYear must be of type Number');
    
    return `${subjectName}-${courseYear}`;
};

exports.generateLoginName = async (vorname='', name='', userId=0) => 
{
    if (!validateArgs([
        {value: vorname, type: 'string'},
        {value: name, type: 'string'},
        {value: userId, type: 'number'},
        ])) throw new Error('vorname and name must be of type String and userId must be of type number');

    let loginName;
    let alreadyExistingUser;
    let offset = 0;
    
    do 
    {
        offset++;
        loginName = `${vorname.toLowerCase()}${name.toLowerCase()}${offset>1 ? offset : ''}`;
        alreadyExistingUser = await getUserByLoginName(loginName);
    }
    while (alreadyExistingUser && alreadyExistingUser.Id !== userId);

    return loginName;
};

const validateArgs = (args=[{value, type}]) =>  
{
    for (const arg of args) 
    {
        if (typeof arg.value != arg.type) return false;
    }
    return true;
};
