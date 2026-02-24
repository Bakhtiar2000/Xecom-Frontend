"use client";

import { Mail, Phone, MapPin, CheckCircle, MapPinHouse, Map, MapPinned } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import SectionTitle from "@/components/sections/shared/SectionTitle";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactPage() {
  const [result, setResult] = useState<string>("");
  console.log("res", result);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Sending...");

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", "4cede823-c646-46b6-8b05-a9bad2a7bb69");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data: { success: boolean } = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully");
        form.reset();
        toast.success("Message sent successfully!");
      } else {
        setResult("Something went wrong");
        toast.error("Failed to send message.");
      }
    } catch (error) {
      setResult("Error submitting form: " + error);
      toast.error("An error occurred while sending the message.");
    }
  };

  return (
    <section className="container">
      {/* Header */}
      <div className="mx-auto mb-20 max-w-2xl text-center">
        <SectionTitle
          subtitle=" Contact Us"
          title=" Get in touch with our sneaker team"
          description=" Have a question about sizing, orders, or collaborations? Fill out the
          form and our team will get back to you shortly."
        ></SectionTitle>
      </div>
      <div className="mb-10 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-2 xl:gap-10">
        <Card className="group border-border bg-background rounded-3xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
          <CardContent className="space-y-5 px-3 py-5 text-center">
            <div className="border-border mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border transition-transform duration-300 group-hover:scale-105">
              <MapPinHouse className="text-foreground h-7 w-7" />
            </div>

            <h4 className="text-lg font-semibold tracking-tight">Head Office</h4>

            <p className="text-muted-foreground text-sm leading-relaxed">
              Dhanmondi 27
              <br />
              Dhaka, Bangladesh
            </p>
          </CardContent>
        </Card>
        <Card className="group border-border bg-background rounded-3xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
          <CardContent className="space-y-5 px-3 py-5 text-center">
            <div className="border-border mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border transition-transform duration-300 group-hover:scale-105">
              <MapPinned className="text-foreground h-7 w-7" />
            </div>

            <h4 className="text-lg font-semibold tracking-tight">Warehouse</h4>

            <p className="text-muted-foreground text-sm leading-relaxed">
              Uttara Sector 7
              <br />
              Dhaka, Bangladesh
            </p>
          </CardContent>
        </Card>
        <Card className="group border-border bg-background rounded-3xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
          <CardContent className="space-y-5 px-3 py-5 text-center">
            <div className="border-border mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border transition-transform duration-300 group-hover:scale-105">
              <Mail className="text-foreground h-7 w-7" />
            </div>

            <h4 className="text-lg font-semibold tracking-tight">Email</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">support@sneakerbd.com</p>
          </CardContent>
        </Card>
        <Card className="group border-border bg-background rounded-3xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
          <CardContent className="space-y-5 px-3 py-5 text-center">
            <div className="border-border mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border transition-transform duration-300 group-hover:scale-105">
              <Phone className="text-foreground h-7 w-7" />
            </div>

            <h4 className="text-lg font-semibold tracking-tight">Phone</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">+880 17XX-XXXXXX</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-5 xl:grid-cols-3 xl:gap-10">
        {/* LEFT: FORM */}
        <div className="xl:col-span-1">
          <form
            onSubmit={onSubmit}
            className="bg-card-primary space-y-6 rounded-lg p-4 shadow-lg md:p-8"
          >
            <div>
              <label className="text-muted-foreground text-xs font-medium">FULL NAME</label>
              <Input name="name" placeholder="Your name" required />
            </div>

            <div>
              <label className="text-muted-foreground text-xs font-medium">EMAIL ADDRESS</label>
              <Input name="email" type="email" placeholder="Enter your email" required />
            </div>

            <div>
              <label className="text-muted-foreground text-xs font-medium">MESSAGE</label>
              <textarea
                name="message"
                rows={4}
                required
                className="border-border bg-background focus-visible:ring-ring w-full rounded-md border px-4 py-3 text-sm focus-visible:ring-2 focus-visible:outline-none"
                placeholder="Write your message here..."
              />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="terms" required />
              <label htmlFor="terms" className="text-muted-foreground text-sm">
                I agree to the <span className="cursor-pointer underline">Terms & Conditions</span>
              </label>
            </div>

            <Button type="submit" className="h-11 w-full rounded-md">
              Send Message
            </Button>
          </form>
        </div>

        {/* RIGHT: INFO */}
        <div className="xl:col-span-2">
          <iframe
            className="h-100 w-full lg:h-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4612.679301264357!2d90.39503632611562!3d23.877575333880674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c43ec75cadf5%3A0xb809cd999981f652!2sSector%209%2C%20Dhaka%201230!5e1!3m2!1sen!2sbd!4v1770734989377!5m2!1sen!2sbd"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
