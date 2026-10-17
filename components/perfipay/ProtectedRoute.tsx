import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

type Props = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function check() {
      const { data } = await supabase.auth.getUser();
      const user = data?.user ?? null;

      if (!user) {
        router.push("/perfi-pay/login");
      }

      if (mounted) {
        setChecking(false);
      }
    }

    check();

    return () => {
      mounted = false;
    };
  }, [router]);

  if (checking) {
    return <div>Checking authentication...</div>;
  }

  return <>{children}</>;
}
