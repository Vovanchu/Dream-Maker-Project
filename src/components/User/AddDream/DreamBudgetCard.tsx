import { useFormContext } from "react-hook-form";
import { useTranslation } from "@/hooks/useTranslation";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { TDreamFormFields } from "@/schemas/AddDreamPage.schema";

export const DreamBudgetCard = () => {
  const t = useTranslation();
  const form = useFormContext<TDreamFormFields>();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-foreground">
          {t.forms.labels.budgetSection}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name="target_budget"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">
                {t.forms.labels.budget} <sup>*</sup>
              </FormLabel>
              <FormControl>
                <Input
                  className="text-foreground"
                  type="number"
                  placeholder={t.forms.placeholders.budget}
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
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
