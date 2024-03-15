import { CreateCard } from "./schema"

import { ActionState } from "@/types/action-state"
import { Card } from "@prisma/client"
import { z } from "zod"

export type InputType = z.infer<typeof CreateCard>
export type ReturnType = ActionState<InputType, Card>
