import { StripeRedirect } from "./schema"

import { ActionState } from "@/types/action-state"
import { z } from "zod"

export type InputType = z.infer<typeof StripeRedirect>
export type ReturnType = ActionState<InputType, string>
