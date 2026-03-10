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
import Header from "@/components/Header/Header";

export const AddDreamPage = () => {
  const t = useTranslation();

  const DreamFormSchema = z.object({
    name: z
      .string()
      .min(1, { message: t.validation.requiredName })
      .regex(/^[a-zA-Zа-яА-ЯґҐєЄіІїЇ\s'-]+$/, {
        message: t.validation.invalidName,
      }),
    age: z
      .number({ message: t.validation.invalidAge })
      .min(1, { message: t.validation.invalidAge })
      .max(120, { message: t.validation.maxAge }),
    city: z.string().min(1, { message: t.validation.requiredCity }),
    dreamTitle: z.string().min(3, { message: t.validation.shortTitle }),
    dreamDescription: z
      .string()
      .min(10, { message: t.validation.shortDescription }),
    format: z.string().min(1, { message: t.pages.addDream.formatRequired }),
    category: z.string().min(1, { message: t.pages.addDream.categoryRequired }),
    budget: z
      .number({ message: t.validation.invalidBudget })
      .min(1, { message: t.pages.addDream.budgetRequired })
      .max(10000, { message: t.validation.maxBudget }),
    contactPhone: z
      .string()
      .min(10, { message: t.validation.requiredPhone })
      .regex(/^\+?[0-9\s\-()]{10,15}$/, {
        message: t.validation.invalidPhone,
      }),
    dreamDeadline: z.date().min(1, { message: t.validation.requiredDeadline }),
  });

  type TDreamFormFields = z.infer<typeof DreamFormSchema>;

  const form = useForm<TDreamFormFields>({
    resolver: zodResolver(DreamFormSchema),
    defaultValues: {
      name: "",
      age: 0,
      city: "",
      dreamTitle: "",
      dreamDescription: "",
      format: "",
      category: "",
      budget: 0,
      contactPhone: "",
      dreamDeadline: new Date(),
    },
  });

  const onSubmit: SubmitHandler<TDreamFormFields> = (
    data: z.infer<typeof DreamFormSchema>,
  ) => {
    console.log(data);
    alert(t.feedback.success.dreamSubmitted);
    form.reset();
  };

  const persons_type = getPersonType(t);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-muted flex flex-col items-center py-12 px-4">
        <h1 className="text-3xl text-foreground font-bold text-center mb-4">
          {t.pages.addDream.pageTitle}
        </h1>
        <p className="text-center text-muted-foreground mb-8">
          {t.pages.addDream.pageSubtitle}
        </p>

        <Form {...form}>
          <div className="w-full max-w-3xl space-y-8">
            {/* --- Блок: Інформація про людину --- */}
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">
                  {t.forms.labels.personInfo}
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        {t.forms.labels.name} <sup>*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t.forms.placeholders.name}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        {t.forms.labels.age} <sup>*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder={t.forms.placeholders.age}
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
                          placeholder={t.forms.placeholders.city}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="w-full text-foreground">
                        {t.forms.labels.contactPhone} <sup>*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t.forms.placeholders.contactPhone}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* --- Блок: Інформація про мечту */}
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
                  name="dreamDeadline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        {t.forms.labels.dreamDeadline} <sup>*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          className="w-1/2 text-muted-foreground"
                          {...field}
                          value={
                            field.value instanceof Date
                              ? field.value.toISOString().split("T")[0]
                              : ""
                          }
                          onChange={(e) =>
                            field.onChange(new Date(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* --- Блок: Формат та категорія --- */}
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
                  name="category"
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

            {/* --- Блок: Бюджет --- */}
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

            {/* --- Кнопки --- */}
            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => form.reset()}
                className="text-foreground cursor-pointer"
              >
                {t.forms.buttons.cancel}
              </Button>
              <Button
                onClick={form.handleSubmit(onSubmit)}
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
