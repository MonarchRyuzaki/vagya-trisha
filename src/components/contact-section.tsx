"use client";

import { handleContactSubmission } from "@/actions/email-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const contactSchema = z.object({
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

  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message cannot exceed 1000 characters")
    .refine(
      (val) => val.trim().length >= 10,
      "Message cannot be empty or just spaces"
    )
    .refine(
      (val) => !/^\s+|\s+$/.test(val),
      "Message cannot start or end with spaces"
    )
    .refine(
      (val) => !/\s{3,}/.test(val),
      "Message cannot contain more than 2 consecutive spaces"
    )
    .refine((val) => {
      const words = val.trim().split(/\s+/);
      return words.length >= 3;
    }, "Message must contain at least 3 words"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const result = await handleContactSubmission(data);
      if (result.success) {
        toast({
          title: "Message Sent!",
          description:
            "Thank you for your message! We will get back to you shortly.",
        });
        reset();
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

  return (
    <section
      id="contact"
      className="w-full py-16 md:py-24 lg:py-32 bg-secondary/50"
    >
      <div className="container mx-auto px-4 md:px-6 grid items-center justify-center gap-8 text-center">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline text-primary">
            Get in Touch
          </h2>
          <p className="mx-auto max-w-[600px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-body">
            Have questions or ready to book a specialized consultation? Reach
            out and begin your journey.
          </p>
        </div>
        <div className="mx-auto w-full max-w-lg">
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2 text-left">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your Name"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-destructive text-sm">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2 text-left">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-destructive text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid gap-2 text-left">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Your Phone Number"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-destructive text-sm">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div className="grid gap-2 text-left">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Your message..."
                className="min-h-[120px]"
                {...register("message")}
              />
              {errors.message && (
                <p className="text-destructive text-sm">
                  {errors.message.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
