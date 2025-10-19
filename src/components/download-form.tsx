import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { TikTokData } from "@/pages/home";
import { apiRequest } from "@/lib/queryClient";
import { validateTikTokUrl } from "@/lib/validators";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  url: validateTikTokUrl,
});

type FormSchema = z.infer<typeof formSchema>;

interface DownloadFormProps {
  onPreview: (data: TikTokData) => void;
}

export function DownloadForm({ onPreview }: DownloadFormProps) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  const fetchMutation = useMutation({
    mutationFn: async (url: string) => {
      const res = await apiRequest("POST", "/api/tiktok/info", { url });
      return res.json();
    },
    onSuccess: (data: TikTokData) => {
      onPreview(data);
      toast({
        title: "Video found!",
        description: "You can now download the video or audio.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  async function onSubmit(data: FormSchema) {
    fetchMutation.mutate(data.url);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex gap-2">
                  <Input
                    placeholder="Paste TikTok URL here..."
                    {...field}
                    className="flex-1 bg-background/50 backdrop-blur-sm border-primary/50 text-foreground placeholder:text-muted-foreground focus:border-primary focus:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all"
                  />
                  <Button
                    type="submit"
                    disabled={fetchMutation.isPending}
                    className="bg-gradient-to-r from-primary to-secondary text-black hover:shadow-[0_0_20px_rgba(0,255,255,0.5)] transition-all duration-300 font-bold"
                  >
                    {fetchMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Extracting...
                      </>
                    ) : (
                      "Extract Info"
                    )}
                  </Button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
