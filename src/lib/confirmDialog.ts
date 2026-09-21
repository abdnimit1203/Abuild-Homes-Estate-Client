import Swal from "sweetalert2";

export interface ConfirmDialogOptions {
  title?: string;
  text?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  icon?: "warning" | "error" | "success" | "info" | "question";
  confirmButtonColor?: string;
  cancelButtonColor?: string;
}

/**
 * Universal interactive confirmation modal using SweetAlert2
 * Prompts the user with 'Yes' or 'No' before any destructive delete action
 */
export const confirmDelete = async ({
  title = "Are you sure?",
  text = "You won't be able to revert this!",
  confirmButtonText = "Yes, delete it!",
  cancelButtonText = "Cancel",
  icon = "warning",
  confirmButtonColor = "#E11D48",
  cancelButtonColor = "#6B7280",
}: ConfirmDialogOptions = {}): Promise<boolean> => {
  const result = await Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonColor,
    cancelButtonColor,
    confirmButtonText,
    cancelButtonText,
    reverseButtons: true,
    focusCancel: true,
    backdrop: "rgba(0, 0, 0, 0.5)",
  });

  return result.isConfirmed;
};
