import { createBoardSchema } from "./schema"

import { ActionState } from "@/lib/create-safe-action"
import { Board } from "@prisma/client"
import { z } from "zod"

export type InputType = z.infer<typeof createBoardSchema>
export type ReturnType = ActionState<InputType, Board>
