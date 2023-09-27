import { Router } from "express";


import CreateAccount from "./Controller/CreateAccount";
import Transferencia from "./Controller/Transferencia";
import InfoUsers from "./Controller/InfoUsers";

const routes = new Router()


routes.post("/user", CreateAccount.store)
routes.post("/myAccount", InfoUsers.store)
routes.post("/transfer", Transferencia.update)

export default routes