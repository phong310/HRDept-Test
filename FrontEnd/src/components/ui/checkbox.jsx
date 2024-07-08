import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "ypeer yh-4 yw-4 yshrink-0 yrounded-sm yborder yborder-primary yshadow focus-visible:youtline-none focus-visible:yring-1 focus-visible:yring-ring disabled:ycursor-not-allowed disabled:yopacity-50 data-[state=checked]:ybg-primary data-[state=checked]:ytext-primary-foreground",
      className
    )}
    {...props}>
    <CheckboxPrimitive.Indicator className={cn("yflex yitems-center yjustify-center ytext-current")}>
      <CheckIcon className="yh-4 yw-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
