import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "@/hooks/useTranslation";

export const AddDreamPage = () => {
  const t = useTranslation();

  const schema = z.object({
    name: z.string().min(1, { message: t.validation.requiredName }),
    age: z
      .number({ message: t.validation.invalidName })
      .min(1, { message: t.validation.invalidName }),
    city: z.string().min(1, { message: t.validation.requiredName }),
    dreamTitle: z.string().min(3, { message: "Title is too short" }),
    dreamDescription: z
      .string()
      .min(10, { message: "Description is too short" }),
    format: z.string().min(1, { message: t.pages.addDream.formatRequired }),
    category: z.string().min(1, { message: t.pages.addDream.categoryRequired }),
    budget: z
      .number({ message: "Budget must be a number" })
      .min(1, { message: t.pages.addDream.budgetRequired }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      age: undefined,
      city: "",
      dreamTitle: "",
      dreamDescription: "",
      format: "",
      category: "",
      budget: undefined,
    },
  });

  const onSubmit = () => {
    alert(t.feedback.success.dreamSubmitted);
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4 py-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-card w-full max-w-lg p-8 rounded-xl shadow-lg flex flex-col gap-6"
      >
        <h1 className="text-2xl font-semibold text-center">
          {t.pages.addDream.pageTitle}
        </h1>
        <p className="text-center text-muted-foreground">
          {t.pages.addDream.pageSubtitle}
        </p>

        {/* Person Info */}
        <fieldset className="flex flex-col gap-4">
          <legend className="font-semibold">
            {t.pages.addDream.personInfo}
          </legend>

          <div className="flex flex-col gap-1">
            <input
              type="text"
              {...register("name")}
              placeholder={t.forms.placeholders.name}
              className="input-field"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <input
              type="number"
              {...register("age", { valueAsNumber: true })}
              placeholder={t.forms.placeholders.age}
              className="input-field"
            />
            {errors.age && (
              <span className="text-red-500 text-sm">{errors.age.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <input
              type="text"
              {...register("city")}
              placeholder={t.forms.placeholders.city}
              className="input-field"
            />
            {errors.city && (
              <span className="text-red-500 text-sm">
                {errors.city.message}
              </span>
            )}
          </div>
        </fieldset>

        {/* Dream Info */}
        <fieldset className="flex flex-col gap-4">
          <legend className="font-semibold">
            {t.pages.addDream.dreamInfo}
          </legend>

          <div className="flex flex-col gap-1">
            <input
              type="text"
              {...register("dreamTitle")}
              placeholder={t.forms.placeholders.dreamTitle}
              className="input-field"
            />
            {errors.dreamTitle && (
              <span className="text-red-500 text-sm">
                {errors.dreamTitle.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <textarea
              {...register("dreamDescription")}
              placeholder={t.forms.placeholders.dreamDescription}
              className="input-field resize-none h-32"
            />
            {errors.dreamDescription && (
              <span className="text-red-500 text-sm">
                {errors.dreamDescription.message}
              </span>
            )}
          </div>
        </fieldset>

        {/* Format & Category */}
        <fieldset className="flex flex-col gap-4">
          <legend className="font-semibold">
            {t.pages.addDream.formatCategory}
          </legend>

          <div className="flex flex-col gap-1">
            <select {...register("format")} className="input-field">
              <option value="">{t.forms.placeholders.name}</option>
              <option value="online">{t.fmt.online}</option>
              <option value="offline">{t.fmt.offline}</option>
            </select>
            {errors.format && (
              <span className="text-red-500 text-sm">
                {errors.format.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <select {...register("category")} className="input-field">
              <option value="">{t.forms.placeholders.category}</option>
              <option value="child">{t.categories.child}</option>
              <option value="elderly">{t.categories.elderly}</option>
              <option value="veteran">{t.categories.veteran}</option>
              <option value="disabled">{t.categories.disabled}</option>
            </select>
            {errors.category && (
              <span className="text-red-500 text-sm">
                {errors.category.message}
              </span>
            )}
          </div>
        </fieldset>

        {/* Budget */}
        <fieldset className="flex flex-col gap-1">
          <legend className="font-semibold">
            {t.pages.addDream.budgetSection}
          </legend>
          <input
            type="number"
            {...register("budget", { valueAsNumber: true })}
            placeholder={t.forms.placeholders.donationAmount}
            className="input-field"
          />
          {errors.budget && (
            <span className="text-red-500 text-sm">
              {errors.budget.message}
            </span>
          )}
        </fieldset>

        {/* Buttons */}
        <div className="flex gap-4 justify-end mt-4">
          <button type="reset" onClick={() => reset()} className="btn-cancel">
            {t.forms.buttons.cancel}
          </button>
          <button type="submit" className="btn-submit">
            {t.forms.buttons.submit}
          </button>
        </div>
      </form>
    </div>
  );
};
