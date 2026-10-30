"use client";

import NextLink from "next/link";
import {
  usePathname,
  useRouter,
  useSearchParams as useNextSearchParams,
  useParams as useNextParams,
} from "next/navigation";
import { forwardRef, startTransition, useEffect, useState, useCallback } from "react";

const STATE_KEY = "tathaastu_nav_state";

function stashState(state) {
  if (typeof window === "undefined") return;
  try {
    if (state === undefined) sessionStorage.removeItem(STATE_KEY);
    else sessionStorage.setItem(STATE_KEY, JSON.stringify(state));
  } catch {
    /* ignore quota errors */
  }
}

function readState() {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = sessionStorage.getItem(STATE_KEY);
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
}

function pathOnly(to) {
  if (typeof to !== "string") return "/";
  const q = to.indexOf("?");
  const h = to.indexOf("#");
  let end = to.length;
  if (q >= 0) end = Math.min(end, q);
  if (h >= 0) end = Math.min(end, h);
  return to.slice(0, end) || "/";
}

export const Link = forwardRef(function Link(
  { to, href, prefetch = true, onMouseEnter, onFocus, ...rest },
  ref
) {
  const router = useRouter();
  const dest = href ?? to ?? "/";

  const warm = () => {
    try {
      router.prefetch(pathOnly(dest));
    } catch {
      /* ignore */
    }
  };

  return (
    <NextLink
      ref={ref}
      href={dest}
      prefetch={prefetch}
      onMouseEnter={(e) => {
        warm();
        onMouseEnter?.(e);
      }}
      onFocus={(e) => {
        warm();
        onFocus?.(e);
      }}
      {...rest}
    />
  );
});

export function useLocation() {
  const pathname = usePathname() || "/";
  const [extra, setExtra] = useState({
    search: "",
    hash: "",
    state: undefined,
  });

  useEffect(() => {
    setExtra({
      search: window.location.search || "",
      hash: window.location.hash || "",
      state: readState(),
    });
  }, [pathname]);

  return { pathname, ...extra };
}

export function useNavigate() {
  const router = useRouter();

  return useCallback(
    (to, options = {}) => {
      if (typeof to === "number") {
        window.history.go(to);
        return;
      }
      if (options.state !== undefined) stashState(options.state);
      else stashState(undefined);

      // Warm destination chunk, then navigate without blocking paint.
      try {
        router.prefetch(pathOnly(to));
      } catch {
        /* ignore */
      }

      startTransition(() => {
        if (options.replace) router.replace(to);
        else router.push(to);
      });
    },
    [router]
  );
}

export function useParams() {
  return useNextParams() || {};
}

export function useSearchParams() {
  const params = useNextSearchParams();
  return [params, () => {}];
}

export function Navigate({ to, replace = false, state }) {
  const router = useRouter();
  useEffect(() => {
    if (state !== undefined) stashState(state);
    const dest = typeof to === "string" ? to : "/";
    startTransition(() => {
      if (replace) router.replace(dest);
      else router.push(dest);
    });
  }, [to, replace, router, state]);
  return null;
}
