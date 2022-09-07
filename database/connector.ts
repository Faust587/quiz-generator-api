import mongoose from "mongoose";

function connect() {
  if (typeof process.env.DATABASE_CONNECTION_URL !== "string") return;
  mongoose.connect(process.env.DATABASE_CONNECTION_URL, {
    keepAlive: true,
    keepAliveInitialDelay: 300000,
  }, (error) => {
    if (error) {
      console.log(error); // TODO: CREATE LOGGER
      throw error;
    }
  });
}

export default {
  mongoose,
  connect
}
