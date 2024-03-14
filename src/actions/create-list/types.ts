import { CreateList } from "./schema"

import { ActionState } from "@/types/action-state"
import { List } from "@prisma/client"
import { z } from "zod"

export type InputType = z.infer<typeof CreateList>
export type ReturnType = ActionState<InputType, List>
