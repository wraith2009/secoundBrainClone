import { Router } from "express";
import { QueryResult } from "../controllers/search.controller";
const SearchRouter = Router();

SearchRouter.route("/searchQuery").post(QueryResult);

export default SearchRouter;
