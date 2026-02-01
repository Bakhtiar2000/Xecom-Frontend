"use client";

import { Mail, Phone, MapPin, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
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
      <div className="text-center max-w-2xl mx-auto mb-20">
        <SectionTitle
          subtitle=" Contact Us"
          title=" Get in touch with our sneaker team"
          description=" Have a question about sizing, orders, or collaborations? Fill out the
          form and our team will get back to you shortly."
        ></SectionTitle>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* LEFT: FORM */}
        <div className="">
          <form
            onSubmit={onSubmit}
            className="space-y-6 max-w-xl bg-card-primary p-8 rounded-lg shadow-lg"
          >
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                FULL NAME
              </label>
              <Input name="name" placeholder="Your name" required />
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground">
                EMAIL ADDRESS
              </label>
              <Input
                name="email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground">
                MESSAGE
              </label>
              <textarea
                name="message"
                rows={4}
                required
                className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Write your message here..."
              />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="terms" required />
              <label htmlFor="terms" className="text-sm text-muted-foreground">
                I agree to the{" "}
                <span className="underline cursor-pointer">
                  Terms & Conditions
                </span>
              </label>
            </div>

            <Button type="submit" className="w-full h-11 rounded-md">
              Send Message
            </Button>
          </form>
        </div>

        {/* RIGHT: INFO */}
        <div className="space-y-10 ">
          {/* Brand Benefits */}
          <div className="bg-card-primary p-4 lg:p-8 rounded-lg">
            <h3 className="font-semibold mb-4">Why sneaker lovers choose us</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                "Premium quality sneakers made for everyday comfort",
                "Perfect fit designed for Bangladeshi customers",
                "Durable materials with modern streetwear style",
                "Fast delivery and responsive local support",
              ].map((item, i) => (
                <li key={i} className="flex gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <Card className="p-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">Head Office</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Dhanmondi 27
                    <br />
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">Warehouse</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Uttara Sector 7
                    <br />
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>
            </Card>
          </div>
          <div className="pt-6 space-y-4 bg-card-primary p-4 lg:p-8 rounded-lg">
            <p className="text-sm font-medium">You can also reach us via</p>

            <div className="flex flex-col sm:flex-row gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                support@sneakerbd.com
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                +880 17XX-XXXXXX
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
