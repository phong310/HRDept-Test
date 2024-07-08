import * as React from "react"
import {
  CaretSortIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons"
import * as SelectPrimitive from "@radix-ui/react-select"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "yflex yh-9 yw-full yitems-center yjustify-between ywhitespace-nowrap yrounded-md yborder yborder-input ybg-transparent ypx-3 ypy-2 ytext-sm yshadow-sm yring-offset-background placeholder:ytext-muted-foreground focus:youtline-none focus:yring-1 focus:yring-ring disabled:ycursor-not-allowed disabled:yopacity-50 [&>span]:yline-clamp-1",
      className
    )}
    {...props}>
    {children}
    <SelectPrimitive.Icon asChild>
      <CaretSortIcon className="yh-4 yw-4 yopacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn("yflex ycursor-default yitems-center yjustify-center ypy-1", className)}
    {...props}>
    <ChevronUpIcon />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn("yflex ycursor-default yitems-center yjustify-center ypy-1", className)}
    {...props}>
    <ChevronDownIcon />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "yrelative yz-50 ymax-h-96 ymin-w-[8rem] yoverflow-hidden yrounded-md yborder ybg-popover ytext-popover-foreground yshadow-md data-[state=open]:yanimate-in data-[state=closed]:yanimate-out data-[state=closed]:yfade-out-0 data-[state=open]:yfade-in-0 data-[state=closed]:yzoom-out-95 data-[state=open]:yzoom-in-95 data-[side=bottom]:yslide-in-from-top-2 data-[side=left]:yslide-in-from-right-2 data-[side=right]:yslide-in-from-left-2 data-[side=top]:yslide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:ytranslate-y-1 data-[side=left]:y-translate-x-1 data-[side=right]:ytranslate-x-1 data-[side=top]:y-translate-y-1",
        className
      )}
      position={position}
      {...props}>
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn("yp-1", position === "popper" &&
          "yh-[var(--radix-select-trigger-height)] yw-full ymin-w-[var(--radix-select-trigger-width)]")}>
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("ypx-2 ypy-1.5 ytext-sm yfont-semibold", className)}
    {...props} />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "yrelative yflex yw-full ycursor-default yselect-none yitems-center yrounded-sm ypy-1.5 ypl-2 ypr-8 ytext-sm youtline-none focus:ybg-accent focus:ytext-accent-foreground data-[disabled]:ypointer-events-none data-[disabled]:yopacity-50",
      className
    )}
    {...props}>
    <span
      className="yabsolute yright-2 yflex yh-3.5 yw-3.5 yitems-center yjustify-center">
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className="yh-4 yw-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("y-mx-1 ymy-1 yh-px ybg-muted", className)}
    {...props} />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
