const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config()

type ErrorWithMessage = {
   message: string
 }

function makeNewConnection(url : string) {
    const db = mongoose.createConnection(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    // https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
    function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
      return (
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof (error as Record<string, unknown>).message === 'string'
      )
    }

    db.on('error', function (error: unknown) {
      if (isErrorWithMessage(error)) return error
      try {
         console.log(`MongoDB :: connection ${JSON.stringify(error)}`);
         db.close().catch(() => console.log(`MongoDB :: failed to close connection`));
       } catch {
         return new Error(String(error))
       }
    });

    db.on('connected', function () {
      console.log(`MongoDB :: connected`);
  });
  
  db.on('disconnected', function () {
      console.log(`MongoDB :: disconnected`);
  });
  
    return db;
}

const userConnection = makeNewConnection(process.env.userDB!)
const gardenConnection = makeNewConnection(process.env.gardenDB!)

export { userConnection, gardenConnection };
// module.exports = {
//     userConnection,
//     gardenConnection,
// };