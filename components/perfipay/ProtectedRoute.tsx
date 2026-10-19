
import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

type Props = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function check() {
      try {
        if (!supabase) {
          throw new Error(
            "Supabase is not configured. Please check the production environment variables."
          );
        }

        const { data, error: authError } = await supabase.auth.getUser();

        if (authError) {
          throw authError;
        }

        if (!data.user) {
          await router.replace("/perfi-pay/login");
          return;
        }

        if (mounted) {
          setChecking(false);
        }
      } catch (err: unknown) {
        if (!mounted) return;

        setError(
          err instanceof Error
            ? err.message
            : "Unable to verify your login. Please try again."
        );
        setChecking(false);
      }
    }

    void check();

    return () => {
      mounted = false;
    };
  }, [router]);

  if (checking) {
    return <div className="p-6 text-white">Checking authentication...</div>;
  }

  if (error) {
    return (
      <div
        role="alert"
        className="rounded-xl border border-amber-400/30 p-6 text-amber-300"
      >
        {error}
        <button
          type="button"
          onClick={() => router.reload()}
          className="ml-3 underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
