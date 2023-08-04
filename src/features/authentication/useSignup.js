import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSettled: () =>
      toast.success(
        "User has successfully been signed up. Now please verify your email."
      ),
  });
  return { signup, isLoading };
}
