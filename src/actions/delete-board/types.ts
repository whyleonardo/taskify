import { DeleteBoard } from "./schema"

import { ActionState } from "@/types/action-state"
import { Board } from "@prisma/client"
import { z } from "zod"

export type InputType = z.infer<typeof DeleteBoard>
export type ReturnType = ActionState<InputType, Board>
