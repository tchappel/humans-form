import { FieldErrors } from "@/components/form/field-errors";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { z } from "zod";
import { type BillingFormData, billingSchema } from "../schema";

export function BillingForm() {
  const [entity, setEntity] = useState<BillingFormData["entity"]>("company");
  const [country, setCountry] = useState<BillingFormData["country"]>("italy");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const fields = {
      entity: formData.get("entity") ?? "",
      name: formData.get("name") ?? "",
      address: formData.get("address") ?? "",
      city: formData.get("city") ?? "",
      zip: formData.get("zip") ?? "",
      country: formData.get("country") ?? "",
      fiscalCode: formData.get("fiscalCode") ?? "",
      vat: formData.get("vat") ?? "",
      sdiPec: formData.get("sdiPec") ?? "",
    };

    console.log(fields);

    const validation = billingSchema.safeParse(fields);

    if (!validation.success) {
      const flattenedErrors = z.flattenError(validation.error);
      setFieldErrors(flattenedErrors.fieldErrors);
    } else {
      alert("SUCCESS !!!");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Billing information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Entity type Field */}
        <div className="space-y-3">
          <Label htmlFor="entity" className="font-normal">
            Purchasing as
          </Label>
          <RadioGroup
            name="entity"
            value={entity}
            onValueChange={(value: "company" | "private") => setEntity(value)}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="company" id="company" />
              <Label htmlFor="company" className="font-normal">
                Company
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="private" id="private" />
              <Label htmlFor="private" className="font-normal">
                Private
              </Label>
            </div>
          </RadioGroup>
          <FieldErrors errors={fieldErrors?.entity} />
        </div>

        {/* Name Field */}
        <div className="space-y-2">
          <Label htmlFor="name" className="font-normal">
            {entity === "company" ? "Company name" : "Full name"}
          </Label>
          <Input id="name" name="name" aria-invalid={!!fieldErrors?.name} />
          <FieldErrors errors={fieldErrors?.name} />
        </div>

        {/* Address Field */}
        <div className="space-y-2">
          <Label htmlFor="address" className="font-normal">
            Billing address
          </Label>
          <Input
            id="address"
            name="address"
            aria-invalid={!!fieldErrors?.address}
          />
          <FieldErrors errors={fieldErrors?.address} />
        </div>

        {/* City and Zip Code - Side by Side */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city" className="font-normal">
              City
            </Label>
            <Input id="city" name="city" aria-invalid={!!fieldErrors?.city} />
            <FieldErrors errors={fieldErrors?.city} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="zip" className="font-normal">
              Zip code
            </Label>
            <Input id="zip" name="zip" aria-invalid={!!fieldErrors?.zip} />
            <FieldErrors errors={fieldErrors?.zip} />
          </div>
        </div>

        {/* Country - Select Dropdown */}
        <div className="space-y-2">
          <Label htmlFor="country" className="font-normal">
            Country
          </Label>
          <Select
            name="country"
            defaultValue={country}
            onValueChange={setCountry}
          >
            <SelectTrigger id="country" aria-invalid={!!fieldErrors?.country}>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="italy">Italy</SelectItem>
              <SelectItem value="france">France</SelectItem>
              <SelectItem value="germany">Germany</SelectItem>
              <SelectItem value="spain">Spain</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="us">United States</SelectItem>
            </SelectContent>
          </Select>
          <FieldErrors errors={fieldErrors?.country} />
        </div>

        {/* FiscalCode Field - Conditional */}
        {entity === "private" && country === "italy" && (
          <div className="space-y-2">
            <Label htmlFor="fiscalCode" className="font-normal">
              Fiscal Code
            </Label>
            <Input
              id="fiscalCode"
              name="fiscalCode"
              aria-invalid={!!fieldErrors?.fiscalCode}
            />
            <FieldErrors errors={fieldErrors?.fiscalCode} />
          </div>
        )}

        {/* VAT Number - Conditional */}
        {entity === "company" && (
          <div className="space-y-2">
            <Label htmlFor="vat" className="font-normal">
              VAT number
            </Label>
            <Input id="vat" name="vat" aria-invalid={!!fieldErrors?.vat} />
            <FieldErrors errors={fieldErrors?.vat} />
          </div>
        )}

        {/* SDI/PEC Code - Conditional */}
        {entity === "company" && country === "italy" && (
          <div className="space-y-2">
            <Label htmlFor="sdiPec" className="font-normal">
              Codice destinatario SDI or Indirizzo PEC{" "}
              <span className="text-muted-foreground">(optional)</span>
            </Label>
            <Input
              id="sdiPec"
              name="sdiPec"
              aria-invalid={!!fieldErrors?.sdiPec}
            />
            <FieldErrors errors={fieldErrors?.sdiPec} />
          </div>
        )}
        <Button type="submit" className="mt-6">
          Submit
        </Button>
      </form>
    </div>
  );
}
