import { useFormContext } from "react-hook-form";
import { useTranslation } from "@/hooks/useTranslation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { TDreamFormFields } from "@/schemas/AddDreamPage.schema";

export const DreamInfoCard = () => {
  const t = useTranslation();
  const form = useFormContext<TDreamFormFields>();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-foreground">
          {t.forms.labels.dreamInfo}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">
                {t.forms.labels.dreamTitle} <sup>*</sup>
              </FormLabel>
              <FormControl>
                <Input
                  className="text-foreground"
                  placeholder={t.forms.placeholders.dreamTitle}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">
                {t.forms.labels.dreamDescription} <sup>*</sup>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t.forms.placeholders.dreamDescription}
                  className="h-32 resize-none text-foreground"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">
                {t.forms.labels.city} <sup>*</sup>
              </FormLabel>
              <FormControl>
                <Input
                  className="text-foreground"
                  placeholder={t.forms.placeholders.city}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};
