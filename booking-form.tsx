"use client"

import Link from "next/link"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { CalendarIcon, MapPin, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import Textarea from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"

const formSchema = z
  .object({
    vehicleType: z.enum(["three-wheeler", "van", "bus", "car"], {
      required_error: "Please select a vehicle type.",
    }),
    pickupLocation: z.string().min(2, {
      message: "Pickup location must be at least 2 characters.",
    }),
    dropoffLocation: z.string().optional(),
    pickupDate: z.date({
      required_error: "A pickup date is required.",
    }),
    pickupTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
      message: "Invalid time format (HH:MM).",
    }),
    returnDate: z.date({
      required_error: "A return date is required.",
    }),
    returnTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
      message: "Invalid time format (HH:MM).",
    }),
    fullName: z.string().min(3, {
      message: "Full name must be at least 3 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    phoneNumber: z.string().regex(/^\+?\d{10,15}$/, {
      message: "Please enter a valid phone number.",
    }),
    specialRequests: z.string().optional(),
    goKeyless: z.boolean().default(false).optional(),
  })
  .refine((data) => data.returnDate >= data.pickupDate, {
    message: "Return date cannot be before pickup date.",
    path: ["returnDate"],
  })
  .refine(
    (data) => {
      if (data.returnDate.toDateString() === data.pickupDate.toDateString()) {
        return data.returnTime > data.pickupTime
      }
      return true
    },
    {
      message: "Return time must be after pickup time on the same day.",
      path: ["returnTime"],
    },
  )

export function BookingForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickupLocation: "Trincomalee",
      dropoffLocation: "",
      pickupTime: "09:00",
      returnTime: "09:00",
      specialRequests: "",
      goKeyless: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    toast({
      title: "Booking Request Submitted!",
      description: "We have received your request and will contact you shortly.",
    })
    form.reset()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 p-8 bg-white rounded-lg shadow-2xl"
      >
        <h3 className="text-2xl font-bold text-gray-800 col-span-full mb-4">Book a Car</h3>

        {/* Pick-up Location */}
        <FormField
          control={form.control}
          name="pickupLocation"
          render={({ field }) => (
            <FormItem className="relative rounded-md border border-input bg-gray-50 px-3 py-2 pt-6 lg:col-span-2">
              <FormLabel className="absolute top-2 left-3 text-xs text-gray-500 flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                Pick-up
              </FormLabel>
              <input
                id={field.name}
                className="w-full bg-transparent text-sm focus:outline-none"
                placeholder="Select Location"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
                aria-describedby={`${field.name}-message`}
              />
              <FormMessage id={`${field.name}-message`} />
            </FormItem>
          )}
        />

        {/* Drop-off Location */}
        <FormField
          control={form.control}
          name="dropoffLocation"
          render={({ field }) => (
            <FormItem className="relative rounded-md border border-input bg-gray-50 px-3 py-2 pt-6 lg:col-span-2">
              <FormLabel className="absolute top-2 left-3 text-xs text-gray-500 flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                Drop-off
              </FormLabel>
              <input
                id={field.name}
                className="w-full bg-transparent text-sm focus:outline-none"
                placeholder="Select Location"
                {...field}
                aria-describedby={`${field.name}-message`}
              />
              <FormMessage id={`${field.name}-message`} />
            </FormItem>
          )}
        />

        {/* Pick-up Date */}
        <FormField
          control={form.control}
          name="pickupDate"
          render={({ field }) => (
            <FormItem className="relative flex flex-col rounded-md border border-input bg-gray-50 px-3 py-2 pt-6 lg:col-span-1">
              <FormLabel className="absolute top-2 left-3 text-xs text-gray-500 flex items-center gap-1">
                <CalendarIcon className="h-3 w-3" />
                Pick-up Date
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"ghost"}
                    className={cn(
                      "w-full pl-0 text-left font-normal bg-transparent",
                      !field.value && "text-muted-foreground",
                    )}
                  >
                    {field.value ? format(field.value, "PPP") : <span>Select Date</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Pick-up Time */}
        <FormField
          control={form.control}
          name="pickupTime"
          render={({ field }) => (
            <FormItem className="relative rounded-md border border-input bg-gray-50 px-3 py-2 pt-6 lg:col-span-1">
              <FormLabel className="absolute top-2 left-3 text-xs text-gray-500 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Pick-up Time
              </FormLabel>
              <input
                id={field.name}
                type="time"
                className="w-full bg-transparent text-sm focus:outline-none"
                {...field}
                aria-describedby={`${field.name}-message`}
              />
              <FormMessage id={`${field.name}-message`} />
            </FormItem>
          )}
        />

        {/* Drop-off Date */}
        <FormField
          control={form.control}
          name="returnDate"
          render={({ field }) => (
            <FormItem className="relative flex flex-col rounded-md border border-input bg-gray-50 px-3 py-2 pt-6 lg:col-span-1">
              <FormLabel className="absolute top-2 left-3 text-xs text-gray-500 flex items-center gap-1">
                <CalendarIcon className="h-3 w-3" />
                Drop-off Date
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"ghost"}
                    className={cn(
                      "w-full pl-0 text-left font-normal bg-transparent",
                      !field.value && "text-muted-foreground",
                    )}
                  >
                    {field.value ? format(field.value, "PPP") : <span>Select Date</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < (form.watch("pickupDate") || new Date())}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Drop-off Time */}
        <FormField
          control={form.control}
          name="returnTime"
          render={({ field }) => (
            <FormItem className="relative rounded-md border border-input bg-gray-50 px-3 py-2 pt-6 lg:col-span-1">
              <FormLabel className="absolute top-2 left-3 text-xs text-gray-500 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Drop-off Time
              </FormLabel>
              <input
                id={field.name}
                type="time"
                className="w-full bg-transparent text-sm focus:outline-none"
                {...field}
                aria-describedby={`${field.name}-message`}
              />
              <FormMessage id={`${field.name}-message`} />
            </FormItem>
          )}
        />

        {/* Go Keyless Checkbox */}
        <FormField
          control={form.control}
          name="goKeyless"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-2 space-y-0 col-span-full">
              <Checkbox checked={field.value} onCheckedChange={field.onChange} id={field.name} />
              <FormLabel htmlFor={field.name} className="text-gray-800">
                Go Keyless
              </FormLabel>
            </FormItem>
          )}
        />

        {/* Hidden fields for full name, email, phone, special requests (kept for schema validation) */}
        <div className="hidden col-span-full">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Full Name</FormLabel>
                <input id={field.name} className="hidden" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Email Address</FormLabel>
                <input id={field.name} type="email" className="hidden" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Phone Number</FormLabel>
                <input id={field.name} type="tel" className="hidden" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="specialRequests"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Special Requests (Optional)</FormLabel>
                <Textarea id={field.name} className="hidden" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="vehicleType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehicle Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="three-wheeler">Three Wheeler</SelectItem>
                    <SelectItem value="van">Van</SelectItem>
                    <SelectItem value="bus">Bus</SelectItem>
                    <SelectItem value="car">Car</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between items-center col-span-full mt-4">
          <Button
            type="submit"
            className="bg-[var(--hertz-yellow)] hover:bg-yellow-600 text-gray-900 font-semibold px-8 py-2 rounded-md"
          >
            Search
          </Button>
          <Link href="#" className="text-blue-600 hover:underline text-sm">
            My existing reservation
          </Link>
        </div>
      </form>
    </Form>
  )
}

export default BookingForm
