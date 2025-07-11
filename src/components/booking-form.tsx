"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  BookingFormValues,
  handleBookingSubmission,
} from "@/actions/email-actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const allServices = [
  { id: "natal-chart-reading", title: "Natal Chart Reading" },
  { id: "synastry-reading", title: "Synastry (Couples) Reading" },
  { id: "vastu-shastra", title: "Vastu Shastra" },
  { id: "numerology-reading", title: "Numerology Reading" },
  { id: "career-vocation", title: "Career & Vocation" },
];

const clientSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "Name can only contain letters, spaces, hyphens, and apostrophes"
    )
    .refine(
      (val) => val.trim().length > 0,
      "Name cannot be empty or just spaces"
    )
    .refine(
      (val) => !/^\s+|\s+$/.test(val),
      "Name cannot start or end with spaces"
    )
    .refine(
      (val) => !/\s{2,}/.test(val),
      "Name cannot contain multiple consecutive spaces"
    ),

  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(100, "Email cannot exceed 100 characters")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email format"
    )
    .refine(
      (val) => val.trim().length > 0,
      "Email cannot be empty or just spaces"
    ),

  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .regex(
      /^[\+]?[1-9][\d]{0,15}$/,
      "Please enter a valid phone number (digits only, optional + at start)"
    )
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits")
    .refine(
      (val) => val.replace(/\D/g, "").length >= 10,
      "Phone number must contain at least 10 digits"
    ),

  secondaryPhone: z
    .string()
    .trim()
    .optional()
    .refine(
      (val) => !val || val.length === 0 || /^[\+]?[1-9][\d]{9,14}$/.test(val),
      "Please enter a valid secondary phone number"
    ),

  dob: z
    .string()
    .trim()
    .min(1, "Date of birth is required")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Please select a valid date")
    .refine((val) => {
      const date = new Date(val);
      const today = new Date();
      const minDate = new Date();
      minDate.setFullYear(today.getFullYear() - 120);
      return date >= minDate && date <= today;
    }, "Please enter a valid birth date (not in future, not more than 120 years ago)"),

  birthTime: z
    .string()
    .trim()
    .min(1, "Time of birth is required")
    .regex(
      /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "Please enter a valid time in HH:MM format"
    ),

  birthPlace: z
    .string()
    .trim()
    .min(2, "Place of birth must be at least 2 characters")
    .max(100, "Place of birth cannot exceed 100 characters")
    .regex(
      /^[a-zA-Z\s,.-]+$/,
      "Place of birth can only contain letters, spaces, commas, periods, and hyphens"
    )
    .refine(
      (val) => val.trim().length > 0,
      "Place of birth cannot be empty or just spaces"
    )
    .refine(
      (val) => !/^\s+|\s+$/.test(val),
      "Place of birth cannot start or end with spaces"
    )
    .refine(
      (val) => !/\s{2,}/.test(val),
      "Place of birth cannot contain multiple consecutive spaces"
    ),
});

const partnerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Partner's name must be at least 2 characters")
    .max(50, "Partner's name cannot exceed 50 characters")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "Partner's name can only contain letters, spaces, hyphens, and apostrophes"
    )
    .refine(
      (val) => val.trim().length > 0,
      "Partner's name cannot be empty or just spaces"
    )
    .refine(
      (val) => !/^\s+|\s+$/.test(val),
      "Partner's name cannot start or end with spaces"
    )
    .refine(
      (val) => !/\s{2,}/.test(val),
      "Partner's name cannot contain multiple consecutive spaces"
    ),

  dob: z
    .string()
    .trim()
    .min(1, "Partner's date of birth is required")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Please select a valid date for partner")
    .refine((val) => {
      const date = new Date(val);
      const today = new Date();
      const minDate = new Date();
      minDate.setFullYear(today.getFullYear() - 120);
      return date >= minDate && date <= today;
    }, "Please enter a valid birth date for partner (not in future, not more than 120 years ago)"),

  birthTime: z
    .string()
    .trim()
    .min(1, "Partner's time of birth is required")
    .regex(
      /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "Please enter a valid time in HH:MM format for partner"
    ),

  birthPlace: z
    .string()
    .trim()
    .min(2, "Partner's place of birth must be at least 2 characters")
    .max(100, "Partner's place of birth cannot exceed 100 characters")
    .regex(
      /^[a-zA-Z\s,.-]+$/,
      "Partner's place of birth can only contain letters, spaces, commas, periods, and hyphens"
    )
    .refine(
      (val) => val.trim().length > 0,
      "Partner's place of birth cannot be empty or just spaces"
    )
    .refine(
      (val) => !/^\s+|\s+$/.test(val),
      "Partner's place of birth cannot start or end with spaces"
    )
    .refine(
      (val) => !/\s{2,}/.test(val),
      "Partner's place of birth cannot contain multiple consecutive spaces"
    ),
});

const bookingSchema = z.object({
  person1: clientSchema,
  person2: partnerSchema.optional(),
  serviceId: z.string().min(1, "Service selection is required"),
  serviceTitle: z.string().min(1, "Service title is required"),
});

export function BookingForm() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      person1: {
        name: "",
        email: "",
        phone: "",
        secondaryPhone: "",
        dob: "",
        birthTime: "",
        birthPlace: "",
      },
      person2: undefined,
      serviceId: "",
      serviceTitle: "",
    },
  });

  useEffect(() => {
    const serviceIdFromUrl = searchParams.get("service");
    const service = allServices.find((s) => s.id === serviceIdFromUrl);

    if (service) {
      setSelectedServiceId(service.id);
      form.setValue("serviceId", service.id);
      form.setValue("serviceTitle", service.title);

      if (service.id === "synastry-reading" && !form.getValues("person2")) {
        form.setValue("person2", {
          name: "",
          dob: "",
          birthTime: "",
          birthPlace: "",
        });
      } else if (service.id !== "synastry-reading") {
        form.setValue("person2", undefined);
        form.clearErrors("person2");
      }
    }
  }, [searchParams, form]);

  const selectedService = allServices.find((s) => s.id === selectedServiceId);

  const onSubmit = async (data: z.infer<typeof bookingSchema>) => {
    setIsSubmitting(true);
    try {
      const result = await handleBookingSubmission(data as BookingFormValues);
      if (result.success) {
        toast({
          title: "Booking Request Sent!",
          description:
            "Thank you! We've received your details and will be in touch shortly.",
        });
        form.reset();
        const serviceIdFromUrl = searchParams.get("service");
        const currentService = allServices.find(
          (s) => s.id === serviceIdFromUrl
        );
        // Reset form to default values but preserve service from URL
        form.reset({
          person1: {
            name: "",
            email: "",
            phone: "",
            secondaryPhone: "",
            dob: "",
            birthTime: "",
            birthPlace: "",
          },
          person2:
            serviceIdFromUrl === "synastry-reading"
              ? { name: "", dob: "", birthTime: "", birthPlace: "" }
              : undefined,
          serviceId: currentService?.id || "",
          serviceTitle: currentService?.title || "",
        });
      } else {
        toast({
          title: "Submission Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "An Error Occurred",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderPersonContactFields = (personKey: "person1", title: string) => (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2 text-left">
            <Label htmlFor={`${personKey}-name`}>Name</Label>
            <Input
              id={`${personKey}-name`}
              {...form.register(`${personKey}.name`)}
            />
            {form.formState.errors[personKey]?.name && (
              <p className="text-destructive text-sm">
                {form.formState.errors[personKey]?.name?.message}
              </p>
            )}
          </div>
          <div className="grid gap-2 text-left">
            <Label htmlFor={`${personKey}-email`}>Email</Label>
            <Input
              id={`${personKey}-email`}
              type="email"
              {...form.register(`${personKey}.email`)}
            />
            {form.formState.errors[personKey]?.email && (
              <p className="text-destructive text-sm">
                {form.formState.errors[personKey]?.email?.message}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2 text-left">
            <Label htmlFor={`${personKey}-phone`}>Phone Number</Label>
            <Input
              id={`${personKey}-phone`}
              {...form.register(`${personKey}.phone`)}
            />
            {form.formState.errors[personKey]?.phone && (
              <p className="text-destructive text-sm">
                {form.formState.errors[personKey]?.phone?.message}
              </p>
            )}
          </div>
          <div className="grid gap-2 text-left">
            <Label htmlFor={`${personKey}-secondaryPhone`}>
              Secondary Phone (Optional)
            </Label>
            <Input
              id={`${personKey}-secondaryPhone`}
              {...form.register(`${personKey}.secondaryPhone`)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderPersonAstrologyFields = (personKey: "person1", title: string) => (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="grid gap-2 text-left">
            <Label htmlFor={`${personKey}-dob`}>Date of Birth</Label>
            <Input
              id={`${personKey}-dob`}
              type="date"
              {...form.register(`${personKey}.dob`)}
            />
            {form.formState.errors[personKey]?.dob && (
              <p className="text-destructive text-sm">
                {form.formState.errors[personKey]?.dob?.message}
              </p>
            )}
          </div>
          <div className="grid gap-2 text-left">
            <Label htmlFor={`${personKey}-birthTime`}>Time of Birth</Label>
            <Input
              id={`${personKey}-birthTime`}
              type="time"
              {...form.register(`${personKey}.birthTime`)}
            />
            {form.formState.errors[personKey]?.birthTime && (
              <p className="text-destructive text-sm">
                {form.formState.errors[personKey]?.birthTime?.message}
              </p>
            )}
          </div>
          <div className="grid gap-2 text-left">
            <Label htmlFor={`${personKey}-birthPlace`}>Place of Birth</Label>
            <Input
              id={`${personKey}-birthPlace`}
              {...form.register(`${personKey}.birthPlace`)}
            />
            {form.formState.errors[personKey]?.birthPlace && (
              <p className="text-destructive text-sm">
                {form.formState.errors[personKey]?.birthPlace?.message}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderPartnerAstrologyFields = (
    personKey: "person2",
    title: string
  ) => (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2 text-left">
          <Label htmlFor={`${personKey}-name`}>Partner's Name</Label>
          <Input
            id={`${personKey}-name`}
            {...form.register(`${personKey}.name`)}
          />
          {form.formState.errors[personKey]?.name && (
            <p className="text-destructive text-sm">
              {form.formState.errors[personKey]?.name?.message}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="grid gap-2 text-left">
            <Label htmlFor={`${personKey}-dob`}>Date of Birth</Label>
            <Input
              id={`${personKey}-dob`}
              type="date"
              {...form.register(`${personKey}.dob`)}
            />
            {form.formState.errors[personKey]?.dob && (
              <p className="text-destructive text-sm">
                {form.formState.errors[personKey]?.dob?.message}
              </p>
            )}
          </div>
          <div className="grid gap-2 text-left">
            <Label htmlFor={`${personKey}-birthTime`}>Time of Birth</Label>
            <Input
              id={`${personKey}-birthTime`}
              type="time"
              {...form.register(`${personKey}.birthTime`)}
            />
            {form.formState.errors[personKey]?.birthTime && (
              <p className="text-destructive text-sm">
                {form.formState.errors[personKey]?.birthTime?.message}
              </p>
            )}
          </div>
          <div className="grid gap-2 text-left">
            <Label htmlFor={`${personKey}-birthPlace`}>Place of Birth</Label>
            <Input
              id={`${personKey}-birthPlace`}
              {...form.register(`${personKey}.birthPlace`)}
            />
            {form.formState.errors[personKey]?.birthPlace && (
              <p className="text-destructive text-sm">
                {form.formState.errors[personKey]?.birthPlace?.message}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (!selectedService) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">No service selected</h1>
        <p>Please go back to the services page and choose a reading.</p>
        <Button asChild className="mt-4">
          <Link href="/#services">View Services</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight font-headline text-primary">
          Book: {selectedService.title}
        </h1>
        <p className="mt-4 text-lg text-foreground/80 font-body">
          Please provide your details below to request a booking.
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {renderPersonContactFields("person1", "Your Contact Details")}
        {renderPersonAstrologyFields("person1", "Your Astrology Details")}
        {selectedServiceId === "synastry-reading" && (
          <>{renderPartnerAstrologyFields("person2", "Partner's Details")}</>
        )}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Booking Request"}
        </Button>
      </form>
    </div>
  );
}
