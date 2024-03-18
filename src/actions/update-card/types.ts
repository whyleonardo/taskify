import { UpdateCard } from "./schema"

import { ActionState } from "@/types/action-state"
import { Card } from "@prisma/client"
import { z } from "zod"

export type InputType = z.infer<typeof UpdateCard>
export type ReturnType = ActionState<InputType, Card>
