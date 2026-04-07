import { useFormContext } from "react-hook-form";
import { useTranslation } from "@/hooks/useTranslation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { getPersonType } from "@/const/personTypes";
import type { TDreamFormFields } from "@/schemas/AddDreamPage.schema";

export const DreamFormatCard = () => {
  const t = useTranslation();
  const form = useFormContext<TDreamFormFields>();
  const persons_type = getPersonType(t);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-foreground">
          {t.forms.labels.formatCategory}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="participation_format"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">
                {t.forms.labels.format} <sup>*</sup>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full cursor-pointer text-muted-foreground">
                    <SelectValue placeholder={t.forms.placeholders.format} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-accent/90 backdrop-blur-md border border-border shadow-xl">
                  <SelectItem
                    value="online"
                    className="cursor-pointer hover:bg-accent-foreground/10 focus:bg-accent-foreground/10"
                  >
                    {t.fmt.online}
                  </SelectItem>
                  <SelectItem
                    value="offline"
                    className="cursor-pointer hover:bg-accent-foreground/10 focus:bg-accent-foreground/10"
                  >
                    {t.fmt.offline}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="person_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">
                {t.forms.labels.category} <sup>*</sup>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full cursor-pointer text-muted-foreground">
                    <SelectValue placeholder={t.forms.placeholders.category} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-accent/90 backdrop-blur-md border border-border shadow-xl">
                  {persons_type.map((pt) => (
                    <SelectItem
                      key={pt.value}
                      value={pt.value}
                      className="cursor-pointer hover:bg-accent-foreground/10 focus:bg-accent-foreground/10"
                    >
                      {pt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};
