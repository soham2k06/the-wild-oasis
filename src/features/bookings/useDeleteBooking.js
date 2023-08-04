import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { bookingId } = useParams();

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      if (!bookingId) {
        toast.success("Booking successfully deleted");
        return;
      }
      toast.success(`Booking #${bookingId} successfully deleted`);

      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteBooking };
}
