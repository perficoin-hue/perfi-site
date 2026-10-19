
import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/router";
import { getSupabaseClient } from "../../lib/supabaseClient";

type Props = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let mounted = true;

    async function check() {
      try {
        const client = getSupabaseClient();
        const { data, error } = await client.auth.getUser();

        if (error || !data.user) {
          if (mounted) {
            await router.replace("/perfi-pay/login");
          }
          return;
        }
      } catch (error) {
        if (mounted) {
          setMessage(
            error instanceof Error
              ? error.message
              : "Unable to verify your login."
          );
        }
      } finally {
        if (mounted) setChecking(false);
      }
    }

    void check();

    return () => {
      mounted = false;
    };
  }, [router]);

  if (checking) {
    return <div className="p-6">Checking authentication...</div>;
  }

  if (message) {
    return <div className="p-6 text-amber-400">{message}</div>;
  }

  return <>{children}</>;
}
