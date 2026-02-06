import { useState } from "react";
import toast from "react-hot-toast";

interface QueueOptions {
  loadingMessage: string;
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: () => void;
}

export default function useQueueMutation<T>(
  items: T[],
  mutationFn: (item: T) => Promise<unknown | undefined>,
  options: QueueOptions,
) {
  const [isProcessing, setIsProcessing] = useState(false);

  const startQueue = async () => {
    if (!items.length) return;

    setIsProcessing(true);
    const toastId = toast.loading(
      `${options.loadingMessage} (0/${items.length})`,
    );
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < items.length; i++) {
      try {
        await mutationFn(items[i]);
        successCount++;
      } catch (error) {
        console.error(`Queue error at index ${i}:`, error);
        failCount++;
      } finally {
        toast.loading(`${options.loadingMessage} (${i + 1}/${items.length})`, {
          id: toastId,
        });
      }
    }

    setIsProcessing(false);

    if (successCount === items.length) {
      toast.success(options.successMessage || "Task completed successfully", {
        id: toastId,
      });
      options.onSuccess?.();
    } else if (successCount > 0) {
      toast.success(
        `Processed ${successCount}/${items.length} items (${failCount} failed)`,
        {
          id: toastId,
        },
      );
      options.onSuccess?.();
    } else {
      toast.error(options.errorMessage || "All items failed to process", {
        id: toastId,
      });
    }
  };

  return { startQueue, isProcessing };
}
