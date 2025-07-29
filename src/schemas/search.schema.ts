import { z } from "zod";
import stringSchema from "./auth/stringSchema";

const searchSchema = z.object({ search: stringSchema });

export default searchSchema;
