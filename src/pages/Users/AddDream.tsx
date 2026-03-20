import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "@/hooks/useTranslation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPersonType } from "@/const/personTypes";
import { addDreamApi } from "@/api/services/dreams";
import type { format_type, person_type } from "@/types/dreams.type";

export const AddDreamPage = () => {
  const t = useTranslation();

  const DreamFormSchema = z.object({
    dreamTitle: z.string().min(3, { message: t.validation.shortTitle }),
    dreamDescription: z
      .string()
      .min(10, { message: t.validation.shortDescription }),
    city: z.string().min(1, { message: t.validation.requiredCity }),
    format: z.string().min(1, { message: t.pages.addDream.formatRequired }),
    person_type: z
      .string()
      .min(1, { message: t.pages.addDream.categoryRequired }),
    budget: z
      .number()
      .min(1, { message: t.pages.addDream.budgetRequired })
      .max(10000, { message: t.validation.maxBudget })
      .refine((val) => !isNaN(val), {
        message: t.validation.invalidBudget,
      }),
    imageUrl: z.string().url({ message: t.validation.invalidUrl }).optional(),
  });

  type TDreamFormFields = z.infer<typeof DreamFormSchema>;

  const form = useForm<TDreamFormFields>({
    resolver: zodResolver(DreamFormSchema),
    defaultValues: {
      dreamTitle: "",
      dreamDescription: "",
      city: "",
      format: "",
      person_type: "",
      budget: 0,
      imageUrl: "",
    },
  });

  const onSubmit: SubmitHandler<TDreamFormFields> = async (data) => {
    const payload = {
      title: data.dreamTitle,
      description: data.dreamDescription,
      person_type: data.person_type as person_type,
      participation_format: data.format as format_type,
      target_budget: data.budget,
      city: data.city,
      image_url:
        data.imageUrl?.trim() ||
        "https://via.placeholder.com/400x300?text=NoImage",
    };

    try {
      await addDreamApi(payload);
      alert(t.feedback.success.dreamSubmitted);
      form.reset();
    } catch {
      alert(t.feedback.errors.somethingWrong);
    }
  };

  const persons_type = getPersonType(t);

  return (
    <>
      <div className="min-h-screen bg-muted flex flex-col items-center py-12 px-4">
        <h1 className="text-3xl text-foreground font-bold text-center mb-4">
          {t.pages.addDream.pageTitle}
        </h1>
        <p className="text-center text-muted-foreground mb-8">
          {t.pages.addDream.pageSubtitle}
        </p>

        <Form {...form}>
          <div className="w-full max-w-3xl space-y-8">
            {/* --- Block: Information about dream */}
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">
                  {t.forms.labels.dreamInfo}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="dreamTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        {t.forms.labels.dreamTitle} <sup>*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
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
                  name="dreamDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        {t.forms.labels.dreamDescription} <sup>*</sup>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={t.forms.placeholders.dreamDescription}
                          className="h-32 resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        {t.forms.labels.imageUrl}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t.forms.placeholders.imageUrl}
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
                        {t.forms.labels.city}
                      </FormLabel>
                      <FormControl>
                        <Input
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

            {/* --- Block: Format and Category --- */}
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">
                  {t.forms.labels.formatCategory}
                </CardTitle>
              </CardHeader>

              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="format"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        {t.forms.labels.format} <sup>*</sup>
                      </FormLabel>

                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full cursor-pointer text-muted-foreground">
                            <SelectValue
                              placeholder={t.forms.placeholders.format}
                            />
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

                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full cursor-pointer text-muted-foreground">
                            <SelectValue
                              placeholder={t.forms.placeholders.category}
                            />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent className="bg-accent/90 backdrop-blur-md border border-border shadow-xl">
                          {persons_type.map((person_type) => (
                            <SelectItem
                              key={person_type.value}
                              value={person_type.value}
                              className="cursor-pointer hover:bg-accent-foreground/10 focus:bg-accent-foreground/10"
                            >
                              {person_type.label}
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

            {/* --- Block: Budget --- */}
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">
                  {t.forms.labels.budgetSection}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        {t.forms.labels.budget} <sup>*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder={t.forms.placeholders.budget}
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* --- Buttons --- */}
            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => form.reset()}
                className="text-foreground cursor-pointer"
              >
                {t.forms.buttons.cancel}
              </Button>
              <Button
                onClick={form.handleSubmit(onSubmit, console.log)}
                className=" cursor-pointer"
              >
                {t.forms.buttons.submit}
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};
