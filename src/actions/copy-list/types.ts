import { CopyList } from "./schema"

import { ActionState } from "@/types/action-state"
import { List } from "@prisma/client"
import { z } from "zod"

export type InputType = z.infer<typeof CopyList>
export type ReturnType = ActionState<InputType, List>
