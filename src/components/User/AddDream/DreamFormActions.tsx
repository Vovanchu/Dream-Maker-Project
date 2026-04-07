import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

type Props = {
  isSubmitting: boolean;
  onCancel: () => void;
  onSubmit: () => void;
};

export const DreamFormActions = ({
  isSubmitting,
  onCancel,
  onSubmit,
}: Props) => {
  const t = useTranslation();

  return (
    <div className="flex justify-end space-x-4 pb-8">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        className="text-foreground cursor-pointer"
        disabled={isSubmitting}
      >
        {t.forms.buttons.cancel}
      </Button>
      <Button
        type="button"
        onClick={onSubmit}
        className="cursor-pointer min-w-30"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            {t.forms.buttons.submitting}
          </>
        ) : (
          t.forms.buttons.submit
        )}
      </Button>
    </div>
  );
};
