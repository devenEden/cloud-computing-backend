import envVars from "@config/envVars";
import log from "@config/winston";
import mongoose from "mongoose";

export default () => {
  log.warn("Attempting DB Connection");
  mongoose
    .connect(envVars.Database.connection as string)
    .then(() => {
      log.info("Mongodb Atlas Connection Successfull");
    })
    .catch((err) => log.error(err));
};
