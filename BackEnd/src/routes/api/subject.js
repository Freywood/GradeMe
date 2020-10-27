const createRoutes = require('../createRoutes');
const extractArguments = require('../extractArguments');

const userRouter = 
createRoutes([
    {
        path: '/create', 
        method: 'post', 
        strategy: 'jwt', 
        callback: (req, res, user) => 
        {
            let args;
            try 
            {  
                args = extractArguments(req.body, 
                [
                    { key: 'name', type: 'string' },
                ]);
            }
            catch (err) 
            {
                return res.status(400).json( {error: err.message} );
            }

            const id = Math.floor(Math.random()*15+5);

            // TODO: create subject and save in DB
            return res.status(200).json( { subjectId: id } );
        }
    },
    {
        path: '/delete', 
        method: 'post', 
        strategy: 'jwt',
        callback: (req, res, user) => 
        {
            let args;
            try 
            {  
                args = extractArguments(req.body, 
                [
                    { key: 'subjectId', type: 'number' },
                ]);
            }
            catch (err) 
            {
                return res.status(400).json( {error: err.message} );
            }
            // TODO: delete subject from DB
            return res.status(200).json( { deletedSubjectId: args.subjectId } );
        }
    },
]);
module.exports = userRouter;
